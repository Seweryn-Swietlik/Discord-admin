import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { Finder } from '../utilities/finder';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';

@Module({
  imports: [AuthModule],
  controllers: [ChannelsController],
  providers: [ChannelsService, Finder],
})
export class ChannelsModule {}
