import { IsNotEmpty, IsString } from 'class-validator';

export class FindMessagesInGuildDto {
  @IsNotEmpty()
  @IsString()
  guildId: string;

  @IsNotEmpty()
  phrase: string | number;
}
