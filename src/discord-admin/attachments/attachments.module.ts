import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';
import { AttachmentSchema } from 'src/schemas/attachment.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageFinder } from '../messages/message-finder';
import { Finder } from '../utilities/finder';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'Attachment', schema: AttachmentSchema },
    ]),
  ],
  controllers: [AttachmentsController],
  providers: [AttachmentsService, Finder, MessageFinder],
})
export class AttachmentsModule {}
