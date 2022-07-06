import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { Finder } from '../utilities/finder';
import { GuildsController } from './guilds.controller';
import { GuildsService } from './guilds.service';

@Module({
  imports: [AuthModule],
  controllers: [GuildsController],
  providers: [GuildsService, Finder],
})
export class GuildsModule {}
