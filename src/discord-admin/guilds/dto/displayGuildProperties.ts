import { IsNotEmpty, IsString } from 'class-validator';

export class DisplayGuildPropertiesDto {
  @IsNotEmpty()
  @IsString()
  guildId: string;
}
