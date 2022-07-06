#### Messages

#### Get message from guild

Lists all messages from the specified guild.

endpoint: get: 'discord/messages/guild'

##### Input payload

```javascript
class FindMessagesInGuildDto {
  guildId: string;
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

endpoint: get: 'discord/messages/channel'

##### Input payload

```javascript
class FindMessageInChannelDto {
  guildId: string;
  channelId: string;
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

endpoint: post: 'discord/messages'

##### Input payload

```javascript
class AddMessageDto {
  guildId: string;
  channelId: string;
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

endpoint: patch: 'discord/messages'

##### Input payload

```javascript
class EditMessageDto {
  guildId: string;
  channelId: string;
  messageId: string;
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

endpoint: delete: 'discord/messages'

##### Input payload

```javascript
class DeleteMessageDto {
  guildId: string;
  channelId: string;
  messageId: string;
}
```

##### Output payload

```javascript
type DeleteMessagePayload = {
  messageId: string,
};
```
