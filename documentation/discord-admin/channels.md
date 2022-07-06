## Channels

#### Get channels

List all channel categories along with channels for the specified guild.

endpoint: get: discord/channels

##### Input payload

```javascript
class GetAllCategoriesDto {
  @IsNotEmpty()
  @IsString()
  guildId: string;
}
```

##### Output payload

```javascript
type GetAllCategories = CategoryChannel | NewsChannel | TextChannel; //channel classes from the discord.js library
```

#### Add channel categories

Creates a channel category to which you can add channels.

endpoint: post: discord/channels/add-category

##### Input payload

```javascript
class AddChannelCategoryDto {
  @IsNotEmpty()
  @IsString()
  guildId: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
```

##### Output payload

```javascript
type AddChannelCategoryOutputPayload = {
  categoryId: string,
};
```

#### Add channel

Allows you to add a channel of the specified type for the selected guild. The channel can be added to the channel category or separately.

endpoint: post: discord/channels

##### Input payload

```javascript
class AddChannelDto {
  @IsNotEmpty()
  @IsString()
  guildId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  channelType: ChannelType;

  @IsString()
  categoryId?: string;
}

type ChannelType = 'text' | 'voice';  //available channel types

```

##### Output payload

```javascript
type AddChannelOutputPayload = {
  channelId: string,
};
```

#### Edit channel

Allows you to edit the channel name based on guild id and channel id

endpoint: patch: discord/channels

##### Input payload

```javascript
class EditChannelDto {
  @IsNotEmpty()
  @IsString()
  guildId: string;

  @IsNotEmpty()
  @IsString()
  channelId: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
```

##### Output payload

```javascript
type EditChannelPayload = {
  channelId: string,
};
```

#### Delete channel

Deletes channel based on guild id and channel id

endpoint: delete: discord/channels

##### Input payload

```javascript
class DeleteChannelDto {
  @IsNotEmpty()
  @IsString()
  guildId: string;

  @IsNotEmpty()
  @IsString()
  channelId: string;
}
```

##### Output payload

```javascript
type DeleteChannelPayload = {
  channelId: string,
};
```
