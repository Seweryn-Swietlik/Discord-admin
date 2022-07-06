import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from 'discord.js';
import { Model, ObjectId } from 'mongoose';
import { Channel } from 'src/schemas/backup/channel.schema';
import { Guild } from 'src/schemas/backup/guild.schema';
import { Member } from 'src/schemas/backup/member.schema';
import { GuildPropertiesToCreate } from 'src/backup/types';
import { GuildProperties } from 'src/discord-admin/guilds/types';

@Injectable()
export class BackupCreator {
  constructor(
    @InjectModel('Guild')
    private readonly guildModel: Model<Guild>,
    @InjectModel('Channel')
    private readonly channelModel: Model<Channel>,
    @InjectModel('Role')
    private readonly roleModel: Model<Role>,
    @InjectModel('Member')
    private readonly memberModel: Model<Member>,
  ) {}

  async createGuildBackup(
    guildProperties: GuildProperties,
    ownerId: string,
    userId: string,
  ): Promise<ObjectId> {
    const { channels, roles, members } = guildProperties;
    const guild = new this.guildModel({
      userId,
      ownerId,
      ...guildProperties,
    });

    const guildPropertiesToCreate = { channels, roles, members };
    const { createdChannels, createdRoles, createdMembers } =
      await this.createGuildPropertiesWrapper(
        guild.id,
        guildPropertiesToCreate,
      );
    guild.channels = createdChannels;
    guild.roles = createdRoles;
    guild.members = createdMembers;
    await guild.save();
    return guild.id;
  }

  private async createGuildPropertiesWrapper(
    guildId: ObjectId,
    guildPropertiesToCreate: GuildPropertiesToCreate,
  ) {
    const { members, channels, roles } = guildPropertiesToCreate;
    const createdChannels = await this.createPropertiesWrapper(
      guildId,
      channels,
      this.channelModel,
    );
    const createdRoles = await this.createPropertiesWrapper(
      guildId,
      roles,
      this.roleModel,
    );
    const createdMembers = await this.createPropertiesWrapper(
      guildId,
      members,
      this.memberModel,
    );
    return { createdChannels, createdRoles, createdMembers };
  }

  private async createPropertiesWrapper<T, S>(
    guildId: ObjectId,
    entityProperties: Array<T>,
    model: Model<S>,
  ): Promise<Array<ObjectId>> {
    const createdEntity = entityProperties.map((properties) => {
      const extendedProperties = { guildId, ...properties };
      return this.createProperties<T, S>(extendedProperties, model);
    });
    return Promise.all(createdEntity);
  }

  private async createProperties<T, S>(
    properties: T,
    model: Model<S>,
  ): Promise<ObjectId> {
    const created = new model(properties);
    await created.save();
    return created.id;
  }
}
