import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteMemberDto {
  @IsNotEmpty()
  @IsString()
  guildId: string;

  @IsNotEmpty()
  @IsString()
  memberToDeleteId: string;
}
