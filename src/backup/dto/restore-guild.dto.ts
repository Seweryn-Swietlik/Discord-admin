import { IsNotEmpty, IsString } from 'class-validator';

export class RestoreGuildDto {
  @IsNotEmpty()
  @IsString()
  backupId: string;

  @IsNotEmpty()
  @IsString()
  clientSecret: string;
}
