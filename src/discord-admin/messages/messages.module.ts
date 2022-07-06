import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { Finder } from '../utilities/finder';
import { MessageFinder } from './message-finder';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  imports: [AuthModule],
  controllers: [MessagesController],
  providers: [MessagesService, MessageFinder, Finder],
})
export class MessagesModule {}
