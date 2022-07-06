import { IsNotEmpty, IsString } from 'class-validator';

export class AddChannelCategoryDto {
  @IsNotEmpty()
  @IsString()
  guildId: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
