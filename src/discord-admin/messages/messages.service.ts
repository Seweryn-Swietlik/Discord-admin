import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GuildBasedChannel, TextChannel } from 'discord.js';
import { BotsRegistry } from 'src/bot/bots-registry';
import { FindMessageInChannelDto } from './dto/find-messages-in-channel.dto';
import { FindMessagesInGuildDto } from './dto/find-messages-in-guild.dto';
import { AddMessageDto } from './dto/add-message.dto';
import { DeleteMessageDto } from './dto/delete-message.dto';
import { EditMessageDto } from './dto/edit-message.dto';
import { Finder } from '../utilities/finder';
import { MessageFinder } from './message-finder';

@Injectable()
export class MessagesService {
  constructor(
    private readonly botsRegistry: BotsRegistry,
    private messageFinder: MessageFinder,
    private readonly finder: Finder,
  ) {}

  async findMessageInChannel(
    findMessageInChannelDto: FindMessageInChannelDto,
    userId: string,
  ) {
    const bot = this.botsRegistry.getBot(userId);
    const { guildId, channelId, phrase } = findMessageInChannelDto;
    const guild = this.finder.findGuild(bot.guilds, guildId);
    const channel = this.finder.findChannel(guild, channelId);
    return await this.messageFinder.findMessagesInChannel(channel, phrase);
  }

  async findMessageInGuild(
    findMessagesInGuildDto: FindMessagesInGuildDto,
    userId: string,
  ) {
    const bot = this.botsRegistry.getBot(userId);
    const { guildId, phrase } = findMessagesInGuildDto;
    const guild = this.finder.findGuild(bot.guilds, guildId);

    return await this.messageFinder.findMessagesInGuild(guild, phrase);
  }

  async addMessage(
    addMessageDto: AddMessageDto,
    userId: string,
  ): Promise<string> {
    const bot = this.botsRegistry.getBot(userId);

    const { guildId, channelId, message } = addMessageDto;
    const guild = this.finder.findGuild(bot.guilds, guildId);
    const channel = this.finder.findChannel(guild, channelId);
    const validatedChannelByType = this.validateChannelType(channel);

    const sentMessage = await validatedChannelByType.send(message);
    return sentMessage.id;
  }

  async deleteMessage(
    deleteMessageDto: DeleteMessageDto,
    userId: string,
  ): Promise<string> {
    const bot = this.botsRegistry.getBot(userId);

    const { guildId, channelId, messageId } = deleteMessageDto;
    const guild = this.finder.findGuild(bot.guilds, guildId);
    const channel = this.finder.findChannel(guild, channelId);
    const validatedChannelByType = this.validateChannelType(channel);

    try {
      await validatedChannelByType.messages.delete(messageId);
      return messageId;
    } catch {
      throw new NotFoundException();
    }
  }

  async editMessage(
    editMessageDto: EditMessageDto,
    userId: string,
  ): Promise<string> {
    const bot = this.botsRegistry.getBot(userId);

    const { guildId, channelId, messageId, message } = editMessageDto;
    const guild = this.finder.findGuild(bot.guilds, guildId);
    const channel = this.finder.findChannel(guild, channelId);
    const validatedChannelByType = this.validateChannelType(channel);

    try {
      await validatedChannelByType.messages.edit(messageId, message);
      return messageId;
    } catch {
      throw new NotFoundException();
    }
  }

  private validateChannelType(channel: GuildBasedChannel): TextChannel {
    const channelType = 'GUILD_TEXT';
    if (channel.type !== channelType) {
      throw new BadRequestException(
        'To send a message, the channel type should be text',
      );
    }
    return channel;
  }
}
