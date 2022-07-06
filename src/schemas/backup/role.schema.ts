import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

@Schema()
export class Role extends Document {
  @Prop()
  discordId: string;

  @Prop()
  name: string;

  @Prop()
  permission: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Guild' })
  guild: mongoose.Schema.Types.ObjectId;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
