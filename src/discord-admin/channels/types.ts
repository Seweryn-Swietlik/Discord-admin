import { CategoryChannel, NewsChannel, TextChannel } from 'discord.js';

export type ChannelType = 'text' | 'voice';

export type GetAllCategories = CategoryChannel | NewsChannel | TextChannel;
