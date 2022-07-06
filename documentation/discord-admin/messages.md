#### Messages

#### Get message from guild

Lists all messages from the specified guild.

endpoint: get: discord/messages/guild

##### Input payload

```javascript
class FindMessagesInGuildDto {
  @IsNotEmpty()
  @IsString()
  guildId: string;

  @IsNotEmpty()
  phrase: string | number;
}
```

##### Output payload

```javascript
type MessagesProperties = {
  channelId: string,
  messageId: string,
  content: string,
  author: AuthorProperties,
  createdTimestamp: number,
}[];

type AuthorProperties = {
  id: string,
  username: string,
  avatarUrl: string,
};
```

#### Get message from channel

Lists all messages from the specified channel.

endpoint: get: discord/messages/channel

##### Input payload

```javascript
class FindMessageInChannelDto {
  @IsNotEmpty()
  @IsString()
  guildId: string;

  @IsNotEmpty()
  @IsString()
  channelId: string;

  @IsNotEmpty()
  phrase: string | number;
}
```

##### Output payload

```javascript
type MessagesProperties = {
  channelId: string,
  messageId: string,
  content: string,
  author: AuthorProperties,
  createdTimestamp: number,
}[];

type AuthorProperties = {
  id: string,
  username: string,
  avatarUrl: string,
};
```

#### Add message

Adds a message to the given channel.

endpoint: post: discord/messages

##### Input payload

```javascript
class AddMessageDto {
  @IsNotEmpty()
  @IsString()
  guildId: string;

  @IsNotEmpty()
  @IsString()
  channelId: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
```

##### Output payload

```javascript
type AddMessageOutputPayload = {
  messageId: string,
};
```

#### Edit message

Edit messages from selected channel based on id.

endpoint: patch: discord/messages

##### Input payload

```javascript
class EditMessageDto {
  @IsNotEmpty()
  @IsString()
  guildId: string;

  @IsNotEmpty()
  @IsString()
  channelId: string;

  @IsNotEmpty()
  @IsString()
  messageId: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
```

##### Output payload

```javascript
type EditMessagePayload = {
  messageId: string,
};
```

#### Delete message

Delete messages from selected channel based on id.

endpoint: delete: discord/messages

##### Input payload

```javascript
class DeleteMessageDto {
  @IsNotEmpty()
  @IsString()
  guildId: string;

  @IsNotEmpty()
  @IsString()
  channelId: string;

  @IsNotEmpty()
  @IsString()
  messageId: string;
}
```

##### Output payload

```javascript
type DeleteMessagePayload = {
  messageId: string,
};
```
