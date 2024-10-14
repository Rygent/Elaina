import { Client, Command } from '@elvia/tesseract';
import {
	ApplicationCommandOptionType,
	ApplicationCommandType,
	ApplicationIntegrationType,
	InteractionContextType
} from 'discord-api-types/v10';
import type { ChatInputCommandInteraction } from 'discord.js';
import { UserAgent } from '@/lib/utils/Constants.js';
import { request } from 'undici';

export default class extends Command {
	public constructor(client: Client<true>) {
		super(client, {
			type: ApplicationCommandType.ChatInput,
			name: 'fml',
			description: 'Get a random F My Life story.',
			options: [
				{
					name: 'language',
					description: 'Optional language of the story.',
					type: ApplicationCommandOptionType.String,
					choices: [
						{
							name: 'English',
							value: 'en'
						},
						{
							name: 'Français',
							value: 'fr'
						}
					],
					required: false
				}
			],
			integrationTypes: [ApplicationIntegrationType.GuildInstall],
			contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
			category: 'Meme'
		});
	}

	public async execute(interaction: ChatInputCommandInteraction<'cached' | 'raw'>) {
		const language = interaction.options.getString('language') ?? 'en';

		const raw = await request(`https://blague.xyz/api/vdm/random?lang=${language}`, {
			method: 'GET',
			headers: { 'User-Agent': UserAgent },
			maxRedirections: 20
		});

		const response: any = await raw.body.json();

		return interaction.reply({ content: response.vdm.content });
	}
}