import { Injectable, NotFoundException } from '@nestjs/common';
import { BotsRegistry } from 'src/bot/bots-registry';
import { ChannelType, GetAllCategories } from './types';
import { AddChannelCategoryDto } from './dto/add-channel-category.dto';
import { AddChannelDto } from './dto/add-channel.dto';
import { DeleteChannelDto } from './dto/delete-channel.dto';
import { EditChannelDto } from './dto/edit-channel.dto';
import { GetAllCategoriesDto } from './dto/get-all-categories.dto';
import { Finder } from '../utilities/finder';
import {
  DISCORD_CHANNEL_CATEGORY_TYPE as DISCORD_CHANNEL_CATEGORY_TYPE,
  DISCORD_CHANNEL_TEXT_TYPE,
  DISCORD_CHANNEL_VOICE_TYPE,
} from 'src/discord-admin/channels/consts';

@Injectable()
export class ChannelsService {
  constructor(
    private readonly botsRegistry: BotsRegistry,
    private readonly finder: Finder,
  ) {}

  async addChannel(
    addChannelDto: AddChannelDto,
    userId: string,
  ): Promise<string> {
    const bot = this.botsRegistry.getBot(userId);

    const { guildId, name, channelType, categoryId } = addChannelDto;
    const guild = this.finder.findGuild(bot.guilds, guildId);
    const type = this.setChannelType(channelType);
    const channel = await guild.channels.create(name, {
      type,
    });
    if (categoryId) {
      try {
        await channel.setParent(categoryId);
        return;
      } catch {
        throw new NotFoundException('There is no such category');
      }
    }
  }

  async addChannelCategory(
    addChannelCategoryDto: AddChannelCategoryDto,
    userId: string,
  ): Promise<string> {
    const bot = this.botsRegistry.getBot(userId);

    const { name, guildId } = addChannelCategoryDto;
    const guild = this.finder.findGuild(bot.guilds, guildId);
    const category = await guild.channels.create(name, {
      type: DISCORD_CHANNEL_CATEGORY_TYPE,
    });
    return category.id;
  }

  getAllCategories(
    getAllCategoriesDto: GetAllCategoriesDto,
    userId: string,
  ): Array<GetAllCategories> {
    const bot = this.botsRegistry.getBot(userId);

    const { guildId } = getAllCategoriesDto;
    const guild = this.finder.findGuild(bot.guilds, guildId);

    return guild.channels.cache.reduce((acc, channel) => {
      if (!acc.includes(channel.parent) && channel.parent !== null) {
        acc.push(channel.parent);
      }
      return acc;
    }, []);
  }

  async editChannel(
    editChannelDto: EditChannelDto,
    userId: string,
  ): Promise<string> {
    const bot = this.botsRegistry.getBot(userId);

    const { guildId, channelId, name } = editChannelDto;
    const guild = this.finder.findGuild(bot.guilds, guildId);
    const channel = this.finder.findChannel(guild, channelId);

    await channel.edit({ name });
    return channel.id;
  }

  async deleteChannel(
    deleteChannelDto: DeleteChannelDto,
    userId: string,
  ): Promise<string> {
    const bot = this.botsRegistry.getBot(userId);

    const { guildId, channelId } = deleteChannelDto;
    const guild = this.finder.findGuild(bot.guilds, guildId);
    const channel = this.finder.findChannel(guild, channelId);

    await channel.delete();
    return channel.id;
  }

  private setChannelType(channelType: ChannelType) {
    return channelType === 'text'
      ? DISCORD_CHANNEL_TEXT_TYPE
      : DISCORD_CHANNEL_VOICE_TYPE;
  }
}
