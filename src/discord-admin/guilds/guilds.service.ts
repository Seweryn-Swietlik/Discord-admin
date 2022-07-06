import { Injectable } from '@nestjs/common';
import { Guild, GuildMember } from 'discord.js';
import {
  ChannelProperties,
  GuildProperties,
  MemberProperties,
  MemberRolesProperties,
  RoleProperties,
} from './types';
import { BotsRegistry } from 'src/bot/bots-registry';
import { Finder } from '../utilities/finder';

@Injectable()
export class GuildsService {
  constructor(
    private readonly botsRegistry: BotsRegistry,
    private readonly finder: Finder,
  ) {}

  extractGuildsProperties(userId: string): Array<GuildProperties> {
    const bot = this.botsRegistry.getBot(userId);
    return bot.guilds.cache.map((guild) => {
      const members = this.extractMembersProperties(guild);
      const channels = this.extractChannelsProperties(guild);
      const roles = this.extractRolesProperties(guild);
      console.log(guild);
      return {
        discordId: guild.id,
        icon: guild.icon,
        name: guild.name,
        members,
        channels,
        roles,
      };
    });
  }

  extractGuildProperties(userId: string, guildId: string): GuildProperties {
    const bot = this.botsRegistry.getBot(userId);
    const guild = this.finder.findGuild(bot.guilds, guildId);

    const members = this.extractMembersProperties(guild);
    const channels = this.extractChannelsProperties(guild);
    const roles = this.extractRolesProperties(guild);

    return {
      discordId: guild.id,
      icon: guild.icon,
      name: guild.name,
      members,
      channels,
      roles,
    };
  }

  private extractMembersProperties(guild: Guild): Array<MemberProperties> {
    return guild.members.cache.map((member) => {
      const roles = this.extractMemberRolesProperties(member);
      return {
        discordId: member.id,
        name: member.displayName,
        nick: member.nickname,
        roles,
      };
    });
  }

  private extractMemberRolesProperties(
    member: GuildMember,
  ): Array<MemberRolesProperties> {
    return member.roles.cache.map((role) => {
      return {
        name: role.name,
        permissions: role.permissions,
      };
    });
  }

  private extractChannelsProperties(guild: Guild): Array<ChannelProperties> {
    return guild.channels.cache.map((channel) => {
      return {
        discordId: channel.id,
        type: channel.type as ChannelProperties['type'],
        name: channel.name,
        parentId: channel.parentId,
      };
    });
  }

  private extractRolesProperties(guild: Guild): Array<RoleProperties> {
    return guild.roles.cache.map((role) => {
      return {
        discordId: role.id,
        name: role.name,
        permissions: role.permissions,
      };
    });
  }
}
