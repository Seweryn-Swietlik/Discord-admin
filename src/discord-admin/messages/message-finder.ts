import { BadRequestException, Injectable } from '@nestjs/common';
import {
  Collection,
  Guild,
  GuildBasedChannel,
  GuildChannelManager,
  Message,
  User,
} from 'discord.js';
import { AuthorProperties, MessageProperties } from './types';

@Injectable()
export class MessageFinder {
  async findMessagesInGuild(
    guild: Guild,
    phrase: string | number,
  ): Promise<Array<MessageProperties>> {
    try {
      const channels = guild.channels;
      const textMessages = await this.getTextChannelsMessages(channels);
      return this.findPhraseInGuildMessages(phrase, textMessages);
    } catch {
      throw new BadRequestException();
    }
  }

  async findMessagesInChannel(
    channel: GuildBasedChannel,
    phrase: string | number,
  ): Promise<Array<MessageProperties>> {
    try {
      const textMessages = await this.getTextChannelMessages(channel);
      return this.findPhraseInChannelMessages(phrase, textMessages);
    } catch {
      throw new BadRequestException();
    }
  }

  async getTextChannelsMessages(channels: GuildChannelManager) {
    const textChannelsMessages = channels.cache.map((channel) => {
      return this.getTextChannelMessages(channel);
    });
    return await Promise.all(textChannelsMessages);
  }

  private async getTextChannelMessages(
    channel: GuildBasedChannel,
  ): Promise<Collection<string, Message<boolean>>> {
    const channelType = 'GUILD_TEXT';
    if (channel.type === channelType) {
      const textChannelMessages = channel.messages.fetch();
      return textChannelMessages;
    }
  }
  private findPhraseInGuildMessages(
    phrase: string | number,
    textMessages: Array<Collection<string, Message<boolean>>>,
  ): Array<MessageProperties> {
    return textMessages
      .reduce((arr, messages) => {
        if (messages) {
          const messageWithPhrase = this.findPhraseInChannelMessages(
            phrase,
            messages,
          );
          arr.push(messageWithPhrase);
        }
        return arr;
      }, [])
      .flat();
  }

  private findPhraseInChannelMessages(
    phrase: string | number,
    messages: Collection<string, Message<boolean>>,
  ) {
    const phraseString = phrase.toString();
    const reg = new RegExp(phraseString);

    return messages.reduce<Array<MessageProperties>>((arr, message) => {
      if (reg.test(message.content)) {
        const messageProperties = this.extractMessageProperties(message);
        arr.push(messageProperties);
      }
      return arr;
    }, []);
  }

  extractMessageProperties(message: Message): MessageProperties {
    const author = this.extractAuthorProperties(message.author);
    return {
      channelId: message.channelId,
      messageId: message.id,
      content: message.content,
      author: author,
      createdTimestamp: message.createdTimestamp,
    };
  }

  private extractAuthorProperties(author: User): AuthorProperties {
    return {
      id: author.id,
      username: author.username,
      avatarUrl: author.displayAvatarURL(),
    };
  }
}
