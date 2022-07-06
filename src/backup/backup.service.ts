import { BadRequestException, Injectable } from '@nestjs/common';
import { BotsRegistry } from 'src/bot/bots-registry';
import { Finder } from 'src/discord-admin/utilities/finder';
import { GuildsService } from 'src/discord-admin/guilds/guilds.service';
import { BackupCreator } from './backup-creator';
import { BackupDbHandler } from './backup-db-handler';
import { MembersService } from 'src/discord-admin/members/members.service';
import { Guild, Message } from 'discord.js';
import { InviteMembersData, SetOwnerData } from 'src/backup/types';
import axios from 'axios';
import { User } from 'src/models/User';
import { RestoreGuildDto } from './dto/restore-guild.dto';
import { ChannelProperties } from 'src/discord-admin/guilds/types';

@Injectable()
export class BackupService {
  constructor(
    private readonly botsRegistry: BotsRegistry,
    private readonly finder: Finder,
    private readonly guildsService: GuildsService,
    private readonly backupCreator: BackupCreator,
    private readonly backupDbHandler: BackupDbHandler,
    private readonly membersService: MembersService,
  ) {}

  async createGuildBackup(userId: string, guildId: string) {
    try {
      const bot = this.botsRegistry.getBot(userId);
      const guild = this.finder.findGuild(bot.guilds, guildId);
      const guildProperties = this.guildsService.extractGuildProperties(
        userId,
        guild.id,
      );
      const owner = await guild.fetchOwner();
      const backupId = await this.backupCreator.createGuildBackup(
        guildProperties,
        owner.id,
        userId,
      );
      return backupId;
    } catch {
      throw new BadRequestException();
    }
  }

  async getAllGuildsBackup(userId: string) {
    const backupGuilds = await this.backupDbHandler.getAllGuildsBackup(userId);
    return backupGuilds;
  }

  async restoreGuild(
    { id, clientId }: User,
    { backupId, clientSecret }: RestoreGuildDto,
  ) {
    const bot = this.botsRegistry.getBot(id);
    const { name, icon, channels, roles, members, ownerId, discordId } =
      await this.backupDbHandler.findGuildBackup(backupId);

    const preparedRolesProperties = roles.map((role) => {
      return {
        id: role.discordId,
        name: role.name,
        permissions: role.permissions,
      };
    });
    const preparedChannelsProperties = channels.map((channel) => ({
      id: channel.discordId,
      type: channel.type as ChannelProperties['type'],
      name: channel.name,
      parentId: channel.parentId,
    }));

    const guild = await bot.guilds.create(name, {
      channels: preparedChannelsProperties,
      roles: preparedRolesProperties,
      icon,
    });
    const oldGuild = this.finder.findGuild(bot.guilds, discordId);
    const accessToken = await this.getAccessToken(clientId, clientSecret);
    await this.setOwner({ guild, oldGuild, ownerId, accessToken });
    await this.inviteMembers({ guild, oldGuild, userId: id, members });
  }

  private async inviteMembers({
    guild,
    oldGuild,
    userId,
    members,
  }: InviteMembersData) {
    const guildId = guild.id;
    const channelId = this.findChannel(guild);
    const inviteUlr = await this.membersService.inviteMember(
      { channelId, guildId },
      userId,
    );

    const membersInvites: Array<Promise<Message<boolean>>> = [];
    members.forEach((member) => {
      oldGuild.members.cache.forEach((memberFromOldGuild) => {
        if (
          member.discordId === memberFromOldGuild.id &&
          memberFromOldGuild.user.bot === false
        ) {
          const invite = memberFromOldGuild.send(inviteUlr);
          membersInvites.push(invite);
        }
      });
    });
    await Promise.all(membersInvites);
  }

  async setOwner({ guild, oldGuild, ownerId, accessToken }: SetOwnerData) {
    const oldGuildOwner = oldGuild.members.cache.find(
      (member) => member.id === ownerId,
    );
    const member = await guild.members.add(oldGuildOwner, {
      accessToken,
    });

    console.log(member.id);
    await guild.setOwner(member);
  }

  private async getAccessToken(
    username: string,
    password: string,
  ): Promise<string> {
    const data = 'grant_type=client_credentials&scope=identify connections';

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const url = 'https://discord.com/api/oauth2/token';
    const response = await axios.post(url, data, {
      headers,
      auth: {
        username,
        password,
      },
    });
    return response.data.access_token;
  }

  private findChannel(guild: Guild) {
    const channel = guild.channels.cache.find(
      (channel) => channel.type === 'GUILD_TEXT',
    );
    return channel.id;
  }
}
