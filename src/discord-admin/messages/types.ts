export type AuthorProperties = {
  id: string;
  username: string;
  avatarUrl: string;
};

export type MessageProperties = {
  channelId: string;
  messageId: string;
  content: string;
  author: AuthorProperties;
  createdTimestamp: number;
};
