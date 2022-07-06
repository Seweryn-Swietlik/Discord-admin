import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteMessageDto {
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
