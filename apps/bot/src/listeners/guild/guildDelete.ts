import { Client, Listener } from '@elvia/tesseract';
import { EmbedBuilder } from '@discordjs/builders';
import { Events, Guild, WebhookClient, type WebhookMessageCreateOptions } from 'discord.js';
import { bold, inlineCode, italic } from '@discordjs/formatters';
import { Colors } from '@/lib/utils/Constants.js';
import { formatNumber } from '@/lib/utils/Functions.js';
import { env } from '@/env.js';
import { prisma } from '@elvia/database';

export default class extends Listener {
	public constructor(client: Client<true>) {
		super(client, {
			name: Events.GuildDelete,
			once: false
		});
	}

	public async run(guild: Guild) {
		if (!this.client.isReady() && !guild.available) return;
		await prisma.guild.delete({ where: { guildId: guild.id } });
		await prisma.tag.deleteMany({ where: { guildId: guild.id } });

		if (env.GuildWebhookUrl) {
			const webhook = new WebhookClient({ url: env.GuildWebhookUrl });
			const threadId = new URL(env.GuildWebhookUrl).searchParams.get('thread_id') as string;
			const guildOwner = await guild.fetchOwner();

			const guildCount = formatNumber(this.client.guilds.cache.size);
			const userCount = formatNumber(this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0));

			const embed = new EmbedBuilder()
				.setColor(Colors.Red)
				.setTitle(`${this.client.user.username} left a Server!`)
				.setThumbnail(guild.iconURL({ size: 512 }))
				.setDescription(
					[
						`${bold(italic('Server:'))} ${guild.name} (${inlineCode(guild.id)})`,
						`${bold(italic('Owner:'))} ${guildOwner.user.tag} (${inlineCode(guildOwner.id)})`
					].join('\n')
				)
				.setFooter({
					text: `${guildCount} guilds | ${userCount} users`,
					iconURL: this.client.user.avatarURL() as string
				});

			const profile = {
				avatarURL: this.client.user?.displayAvatarURL({ size: 4096 }),
				username: this.client.user?.username
			} as WebhookMessageCreateOptions;

			return webhook.send({ embeds: [embed], threadId, ...profile });
		}
	}
}
