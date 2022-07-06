import { IsNotEmpty, IsString } from 'class-validator';

export class EditChannelDto {
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
