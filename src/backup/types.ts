import { Guild } from 'discord.js';
import { ObjectId } from 'mongoose';
import {
  MemberProperties,
  ChannelProperties,
  RoleProperties,
} from 'src/discord-admin/guilds/types';

export type ChannelDbProperties = {
  discordId: string;
  name: string;
  type: string;
  parentId: string;
  guild: ObjectId;
};

export type GuildPropertiesToCreate = {
  members: Array<MemberProperties>;
  channels: Array<ChannelProperties>;
  roles: Array<RoleProperties>;
};

export type InviteMembersData = {
  guild: Guild;
  oldGuild: Guild;
  userId: string;
  members: Array<MemberProperties>;
};

export type SetOwnerData = {
  guild: Guild;
  oldGuild: Guild;
  ownerId: string;
  accessToken: string;
};
