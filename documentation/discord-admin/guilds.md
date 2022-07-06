## Guilds

#### Get guilds

Lists data of all guilds of a given user.

endpoint: get: discord/guilds

##### Output payload

```javascript
type GuildsProperties = {
  discordId: string,
  name: string,
  icon: string,
  members: Array<MemberProperties>,
  channels: Array<ChannelProperties>,
  roles: Array<RoleProperties>,
}[];

type MemberProperties = {
  discordId: string,
  name: string,
  nick: string,
  roles: Array<MemberRolesProperties>,
};

type MemberRolesProperties = {
  name: string,
  permissions: Readonly<Permissions>, //type from the discord.js library
};

type ChannelProperties = {
  discordId: string,
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
    | 'UNKNOWN',
  >,
  name: string,
  parentId: string,
};

type RoleProperties = {
  discordId: string,
  name: string,
  permissions: Readonly<Permissions>, //type from the discord.js library
};
```

#### Get guild

Lists guild data based on id

endpoint: get: discord/guilds/guild

##### Input payload

```javascript
class DisplayGuildPropertiesDto {
  @IsNotEmpty()
  @IsString()
  guildId: string;
}
```

##### Output payload

```javascript
type GuildProperties = {
  discordId: string,
  name: string,
  icon: string,
  members: Array<MemberProperties>,
  channels: Array<ChannelProperties>,
  roles: Array<RoleProperties>,
};
```
