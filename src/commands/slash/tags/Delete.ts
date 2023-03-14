import type BaseClient from '../../../lib/BaseClient.js';
import Command from '../../../lib/structures/Interaction.js';
import { ActionRowBuilder, ButtonBuilder } from '@discordjs/builders';
import { ButtonStyle, ComponentType } from 'discord-api-types/v10';
import type { AutocompleteInteraction, ButtonInteraction, ChatInputCommandInteraction } from 'discord.js';
import { inlineCode } from '@discordjs/formatters';
import { shuffleArray } from '../../../lib/utils/Function.js';
import { prisma } from '../../../lib/utils/Prisma.js';
import { nanoid } from 'nanoid';

export default class extends Command {
	public constructor(client: BaseClient) {
		super(client, {
			name: 'tags delete',
			description: 'Delete an existing server tag.',
			category: 'Tags',
			memberPermissions: ['ManageGuild'],
			guildOnly: true
		});
	}

	public async execute(interaction: ChatInputCommandInteraction<'cached'>) {
		const name = interaction.options.getString('name', true);

		const database = await prisma.guild.findFirst({
			where: { id: interaction.guildId },
			select: { tags: true }
		});

		const tag = database?.tags.find(({ slug }) => slug === name);
		if (!tag) return interaction.reply({ content: `The tag ${inlineCode(name)} doesn't exist.`, ephemeral: true });

		const cancelId = nanoid();
		const deleteId = nanoid();
		const button = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(new ButtonBuilder()
				.setCustomId(cancelId)
				.setStyle(ButtonStyle.Secondary)
				.setLabel('Cancel'))
			.addComponents(new ButtonBuilder()
				.setCustomId(deleteId)
				.setStyle(ButtonStyle.Danger)
				.setLabel('Delete'));

		const reply = await interaction.reply({ content: `Are you sure that you want to delete ${inlineCode(name)}?`, components: [button], ephemeral: true });

		const filter = (i: ButtonInteraction) => i.user.id === interaction.user.id;
		const collector = reply.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 6e4, max: 1 });

		collector.on('ignore', (i) => void i.deferUpdate());
		collector.on('collect', async (i) => {
			switch (i.customId) {
				case cancelId:
					collector.stop();
					return void i.update({ content: 'Cancelation of the deletion.', components: [] });
				case deleteId:
					await prisma.tag.delete({ where: { id: tag.id } });

					return void i.update({ content: `Successfully deleted the tag ${inlineCode(name)}.`, components: [] });
			}
		});

		collector.on('end', (collected, reason) => {
			if (!collected.size && reason === 'time') {
				return interaction.deleteReply();
			}
		});
	}

	public override async autocomplete(interaction: AutocompleteInteraction<'cached'>) {
		const focused = interaction.options.getFocused();

		const database = await prisma.guild.findFirst({
			where: { id: interaction.guildId },
			select: { tags: true }
		});

		const choices = database?.tags.filter(({ name }) => name.toLowerCase().includes(focused.toLowerCase()));
		if (!choices?.length) return interaction.respond([]);

		const respond = choices.map(({ name, slug }) => ({ name, value: slug }));

		return interaction.respond(shuffleArray(respond).slice(0, 25));
	}
}
