import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BotsModule } from './bot/bots.module';
import { AttachmentsModule } from './discord-admin/attachments/attachments.module';
import { ChannelsModule } from './discord-admin/channels/channels.module';
import { GuildsModule } from './discord-admin/guilds/guilds.module';
import { MembersModule } from './discord-admin/members/members.module';
import { MessagesModule } from './discord-admin/messages/messages.module';
import { UsersModule } from './user/users.module';
import { BackupModule } from './backup/backup.module';

@Module({
  imports: [
    AuthModule,
    ChannelsModule,
    GuildsModule,
    MessagesModule,
    MembersModule,
    BotsModule,
    UsersModule,
    AttachmentsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.wreco.mongodb.net/DiscordDatabase?retryWrites=true&w=majority`,
      }),
    }),
    BackupModule,
  ],
})
export class AppModule {}
