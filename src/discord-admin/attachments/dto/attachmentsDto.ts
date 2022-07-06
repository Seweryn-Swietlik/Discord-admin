import { IsNotEmpty, IsString } from 'class-validator';

export class AttachmentsDto {
  @IsNotEmpty()
  @IsString()
  guildId: string;
}
