import { Injectable, NotFoundException } from '@nestjs/common';
import { Guild, GuildManager } from 'discord.js';

@Injectable()
export class Finder {
  findGuild(guilds: GuildManager, guildId: string) {
    const guild = guilds.cache.find((guild) => guild.id === guildId);
    if (!guild) {
      throw new NotFoundException();
    }
    return guild;
  }

  findChannel(guild: Guild, channelId: string) {
    const channel = guild.channels.cache.find(
      (channelFromGuild) => channelFromGuild.id === channelId,
    );
    if (!channel) {
      throw new NotFoundException();
    }
    return channel;
  }
}
