import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BotTokenSchema } from 'src/schemas/bot-token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'BotToken', schema: BotTokenSchema }]),
  ],
})
export class BotsModule {}
