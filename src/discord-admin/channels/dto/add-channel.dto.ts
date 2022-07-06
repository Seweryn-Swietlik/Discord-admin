import { IsNotEmpty, IsString } from 'class-validator';
import { ChannelType } from '../types';

export class AddChannelDto {
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
