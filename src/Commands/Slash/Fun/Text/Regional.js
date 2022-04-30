const InteractionCommand = require('../../../../Structures/Interaction');
const { convert } = require('discord-emoji-convert');

module.exports = class extends InteractionCommand {

	constructor(...args) {
		super(...args, {
			name: ['text', 'regional'],
			description: 'Transform your text to regional indicators.'
		});
	}

	async run(interaction) {
		const text = await interaction.options.getString('text', true);

		return interaction.reply({ content: convert(text) });
	}

};