import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Guild extends Document {
  @Prop()
  userId: string;

  @Prop()
  discordId: string;

  @Prop()
  name: string;

  @Prop()
  icon: string;

  @Prop()
  ownerId: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }])
  channels: Array<mongoose.Schema.Types.ObjectId>;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }])
  roles: Array<mongoose.Schema.Types.ObjectId>;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }])
  members: Array<mongoose.Schema.Types.ObjectId>;
}

export const GuildSchema = SchemaFactory.createForClass(Guild);
