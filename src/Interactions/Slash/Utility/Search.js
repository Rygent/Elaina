import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord-api-types/v10';

export default {
	name: 'search',
	description: 'Search for something.',
	type: ApplicationCommandType.ChatInput,
	options: [{
		name: 'anime',
		description: 'Search for an Anime on Anilist.',
		type: ApplicationCommandOptionType.Subcommand,
		options: [{
			name: 'search',
			description: 'Your search.',
			type: ApplicationCommandOptionType.String,
			required: true
		}]
	}, {
		name: 'instagram',
		description: 'Search for user on Instagram.',
		type: ApplicationCommandOptionType.Subcommand,
		options: [{
			name: 'username',
			description: 'Username to search.',
			type: ApplicationCommandOptionType.String,
			required: true
		}]
	}, {
		name: 'manga',
		description: 'Search for a Manga on Anilist.',
		type: ApplicationCommandOptionType.Subcommand,
		options: [{
			name: 'search',
			description: 'Your search.',
			type: ApplicationCommandOptionType.String,
			required: true
		}]
	}, {
		name: 'movie',
		description: 'Search for a Movie on TMDb.',
		type: ApplicationCommandOptionType.Subcommand,
		options: [{
			name: 'search',
			description: 'Your search.',
			type: ApplicationCommandOptionType.String,
			required: true
		}]
	}, {
		name: 'show',
		description: 'Search for a TV Show on TMDb.',
		type: ApplicationCommandOptionType.Subcommand,
		options: [{
			name: 'search',
			description: 'Your search.',
			type: ApplicationCommandOptionType.String,
			required: true
		}]
	}, {
		name: 'spotify',
		description: 'Search for a Song on Spotify.',
		type: ApplicationCommandOptionType.Subcommand,
		options: [{
			name: 'search',
			description: 'Your search.',
			type: ApplicationCommandOptionType.String,
			required: true
		}]
	}, {
		name: 'steam',
		description: 'Search for a Games on Steam.',
		type: ApplicationCommandOptionType.Subcommand,
		options: [{
			name: 'search',
			description: 'Your search.',
			type: ApplicationCommandOptionType.String,
			required: true
		}]
	}, {
		name: 'weather',
		description: 'Search for Weather forecast.',
		type: ApplicationCommandOptionType.Subcommand,
		options: [{
			name: 'search',
			description: 'Your search.',
			type: ApplicationCommandOptionType.String,
			required: true
		}]
	}, {
		name: 'wikipedia',
		description: 'Search for something on Wikipedia.',
		type: ApplicationCommandOptionType.Subcommand,
		options: [{
			name: 'search',
			description: 'Your search.',
			type: ApplicationCommandOptionType.String,
			required: true
		}]
	}],
	dm_permission: true
};