import { IsNotEmpty, IsString } from 'class-validator';

export class CarateGuildBackupDto {
  @IsNotEmpty()
  @IsString()
  guildId: string;
}
