import { ExcludeEnum } from 'discord.js';
import { Permissions } from 'discord.js';
import { ChannelTypes } from 'discord.js/typings/enums';

export type GuildProperties = {
  discordId: string;
  name: string;
  icon: string;
  members: Array<MemberProperties>;
  channels: Array<ChannelProperties>;
  roles: Array<RoleProperties>;
};

export type MemberProperties = {
  discordId: string;
  name: string;
  nick: string;
  roles: Array<MemberRolesProperties>;
};

export type MemberRolesProperties = {
  name: string;
  permissions: Readonly<Permissions>;
};

export type ChannelProperties = {
  discordId: string;
  type: ExcludeEnum<
    typeof ChannelTypes,
    | 'GUILD_NEWS_THREAD'
    | 'GUILD_PUBLIC_THREAD'
    | 'GUILD_PRIVATE_THREAD'
    | 'GUILD_NEWS'
    | 'GUILD_STAGE_VOICE'
    | 'GUILD_STORE'
    | 'DM'
    | 'GROUP_DM'
    | 'UNKNOWN'
  >;
  name: string;
  parentId: string;
};

export type RoleProperties = {
  discordId: string;
  name: string;
  permissions: Readonly<Permissions>;
};
