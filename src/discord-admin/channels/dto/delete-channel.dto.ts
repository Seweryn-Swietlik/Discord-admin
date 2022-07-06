import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteChannelDto {
  @IsNotEmpty()
  @IsString()
  guildId: string;

  @IsNotEmpty()
  @IsString()
  channelId: string;
}
