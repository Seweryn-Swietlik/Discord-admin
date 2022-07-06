import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Embed extends Document {
  @Prop()
  guildId: string;

  @Prop()
  url: string;

  @Prop()
  title: string;

  @Prop()
  type: string;
}

export const EmbedSchema = SchemaFactory.createForClass(Embed);
