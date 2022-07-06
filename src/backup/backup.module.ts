import { Module } from '@nestjs/common';
import { BackupService } from './backup.service';
import { BackupController } from './backup.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChannelSchema } from 'src/schemas/backup/channel.schema';
import { GuildSchema } from 'src/schemas/backup/guild.schema';
import { Finder } from 'src/discord-admin/utilities/finder';
import { GuildsService } from 'src/discord-admin/guilds/guilds.service';
import { RoleSchema } from 'src/schemas/backup/role.schema';
import { MemberSchema } from 'src/schemas/backup/member.schema';
import { MessageFinder } from 'src/discord-admin/messages/message-finder';
import { BackupCreator } from './backup-creator';
import { MembersService } from 'src/discord-admin/members/members.service';
import { BackupDbHandler } from './backup-db-handler';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'Guild', schema: GuildSchema },
      { name: 'Channel', schema: ChannelSchema },
      { name: 'Role', schema: RoleSchema },
      { name: 'Member', schema: MemberSchema },
    ]),
  ],
  controllers: [BackupController],
  providers: [
    BackupService,
    Finder,
    GuildsService,
    MessageFinder,
    BackupCreator,
    MembersService,
    BackupDbHandler,
  ],
})
export class BackupModule {}
