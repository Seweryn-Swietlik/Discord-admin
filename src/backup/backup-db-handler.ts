import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ChannelProperties,
  RoleProperties,
  MemberProperties,
} from 'src/discord-admin/guilds/types';
import { Guild } from 'src/schemas/backup/guild.schema';

@Injectable()
export class BackupDbHandler {
  constructor(
    @InjectModel('Guild')
    private readonly guildModel: Model<Guild>,
  ) {}

  async findGuildBackup(backupId: string) {
    const guild = await this.guildModel
      .findOne({ _id: backupId })
      .populate<{ channels: Array<ChannelProperties> }>('channels')
      .populate<{ roles: Array<RoleProperties> }>('roles')
      .populate<{ members: Array<MemberProperties> }>('members');

    return {
      discordId: guild.discordId,
      name: guild.name,
      icon: guild.icon,
      channels: guild.channels as Array<ChannelProperties>,
      roles: guild.roles as Array<RoleProperties>,
      members: guild.members as Array<MemberProperties>,
      ownerId: guild.ownerId,
    };
  }

  async getAllGuildsBackup(userId: string) {
    const guilds = await this.guildModel.find({ userId });
    return guilds;
  }
}
