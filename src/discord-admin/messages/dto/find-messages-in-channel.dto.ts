import { IsNotEmpty, IsString } from 'class-validator';

export class FindMessageInChannelDto {
  @IsNotEmpty()
  @IsString()
  guildId: string;

  @IsNotEmpty()
  @IsString()
  channelId: string;

  @IsNotEmpty()
  phrase: string | number;
}
