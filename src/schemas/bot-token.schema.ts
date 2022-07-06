import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BotToken extends Document {
  @Prop()
  userId: string;

  @Prop()
  token: string;
}

export const BotTokenSchema = SchemaFactory.createForClass(BotToken);
