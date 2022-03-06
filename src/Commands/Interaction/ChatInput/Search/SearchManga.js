const Interaction = require('../../../../Structures/Interaction');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const { ButtonStyle, ComponentType } = require('discord-api-types/v9');
const { Colors } = require('../../../../Utils/Constants');
const Kitsu = require('kitsu');
const api = new Kitsu();
const moment = require('moment');

module.exports = class extends Interaction {

	constructor(...args) {
		super(...args, {
			name: 'search',
			subCommand: 'manga',
			description: 'Search for a Manga on Kitsu.'
		});
	}

	async run(interaction) {
		const search = await interaction.options.getString('search', true);
		await interaction.deferReply({ fetchReply: true });

		const { data } = await api.get('manga', { params: { filter: { text: search } } });
		if (data.length === 0) return interaction.editReply({ content: 'Nothing found for this search.' });

		const select = new MessageActionRow()
			.addComponents(new MessageSelectMenu()
				.setCustomId('data_menu')
				.setPlaceholder('Select a manga!')
				.addOptions(data.map(res => ({
					label: res.titles.en_jp || Object.values(res.titles)[0] || 'Unknown Name',
					description: this.client.utils.truncateString(res.description, 100),
					value: res.slug
				}))));

		return interaction.editReply({ content: `I found **${data.length}** possible matches, please select one of the following:`, components: [select] }).then(message => {
			const collector = message.createMessageComponentCollector({ componentType: ComponentType.SelectMenu, time: 60_000 });

			collector.on('collect', async (i) => {
				if (i.user.id !== interaction.user.id) return i.deferUpdate();
				await i.deferUpdate();

				const [choices] = i.values;
				const result = data.find(x => x.slug === choices);

				const button = new MessageActionRow()
					.addComponents(new MessageButton()
						.setStyle(ButtonStyle.Link)
						.setLabel('Open in Browser')
						.setURL(`https://kitsu.io/manga/${result.slug}`));

				const embed = new MessageEmbed()
					.setColor(Colors.Default)
					.setAuthor({ name: 'Kitsu', iconURL: 'https://i.imgur.com/YlUX5JD.png', url: 'https://kitsu.io' })
					.setTitle(result.titles.en_jp || Object.values(result.titles)[0])
					.setThumbnail(result.posterImage?.original)
					.addField('__Detail__', [
						`***English:*** ${result.titles.en ? result.titles.en : '`N/A`'}`,
						`***Japanese:*** ${result.titles.ja_jp ? result.titles.ja_jp : '`N/A`'}`,
						`***Synonyms:*** ${result.abbreviatedTitles.length > 0 ? result.abbreviatedTitles.join(', ') : '`N/A`'}`,
						`***Score:*** ${result.averageRating ? result.averageRating : '`N/A`'}`,
						`***Rating:*** ${result.ageRating ? result.ageRating : '`N/A`'}${result.ageRatingGuide ? ` - ${result.ageRatingGuide}` : ''}`,
						`***Type:*** ${result.mangaType ? result.mangaType === 'oel' ? result.mangaType.toUpperCase() : result.mangaType.toSentenceCase() : '`N/A`'}`,
						`***Volumes:*** ${result.volumeCount ? result.volumeCount : '`N/A`'}`,
						`***Chapters:*** ${result.chapterCount ? result.chapterCount : '`N/A`'}`,
						`***Status:*** ${result.status ? result.status === 'tba' ? result.status.toUpperCase() : result.status.toSentenceCase() : '`N/A`'}`,
						`***Published:*** ${result.startDate ? `${moment(result.startDate).format('MMM D, YYYY')} to ${result.endDate ? moment(result.endDate).format('MMM D, YYYY') : '?'}` : '`N/A`'}`,
						`***Serialization:*** ${result.serialization ? result.serialization : '`N/A`'}`
					].join('\n'))
					.setImage(result.coverImage?.small)
					.setFooter({ text: 'Powered by Kitsu', iconURL: interaction.user.avatarURL({ dynamic: true }) });

				if (result.synopsis) {
					embed.setDescription(this.client.utils.truncateString(result.synopsis, 512));
				}

				return i.editReply({ content: '\u200B', embeds: [embed], components: [button] });
			});

			collector.on('end', (collected, reason) => {
				if ((collected.size === 0 || collected.filter(x => x.user.id === interaction.user.id).size === 0) && reason === 'time') {
					return interaction.deleteReply();
				}
			});
		});
	}

};
