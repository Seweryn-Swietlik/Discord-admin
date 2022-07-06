import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Attachment extends Document {
  @Prop()
  guildId: string;

  @Prop()
  attachmentId: string;

  @Prop()
  url: string;

  @Prop()
  name: string;
}

export const AttachmentSchema = SchemaFactory.createForClass(Attachment);
