import { IsNotEmpty, IsString } from 'class-validator';

export class InviteMemberDto {
  @IsNotEmpty()
  @IsString()
  guildId: string;

  @IsNotEmpty()
  @IsString()
  channelId: string;
}
