import { IsNotEmpty, IsString } from 'class-validator';

export class FindAllMembersDto {
  @IsNotEmpty()
  @IsString()
  guildId: string;
}
