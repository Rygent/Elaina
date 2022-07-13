import { EmbedBuilder } from '@discordjs/builders';
import { fetch } from 'undici';
import Command from '../../../../Structures/Interaction.js';
import { Colors } from '../../../../Utils/Constants.js';

export default class extends Command {

	constructor(...args) {
		super(...args, {
			name: ['interact', 'punch'],
			description: 'Punch someone.'
		});
	}

	async run(interaction) {
		const member = interaction.options.getMember('user');

		const raw = await fetch(`https://nekoapi.vanillank2006.repl.co/api/action/punch`, { method: 'GET' });
		const response = await raw.json();

		const embed = new EmbedBuilder()
			.setColor(Colors.Default)
			.setDescription(`${member.toString()}, you've got a punch from ${interaction.user.toString()}.`)
			.setImage(response.url)
			.setFooter({ text: `Powered by ${this.client.user.username}`, iconURL: interaction.user.avatarURL() });

		return interaction.reply({ embeds: [embed] });
	}

}
