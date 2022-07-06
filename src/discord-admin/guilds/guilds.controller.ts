import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GuildProperties } from './types';
import { GuildsService } from './guilds.service';
import { Request } from 'express';
import { User } from 'src/models/User';
import { DisplayGuildPropertiesDto } from './dto/displayGuildProperties';

@Controller('discord/guilds')
export class GuildsController {
  constructor(private guildsService: GuildsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  displayGuildsProperties(@Req() req: Request): Array<GuildProperties> {
    const user = req.user as User;
    return this.guildsService.extractGuildsProperties(user.id);
  }

  @Get('guild')
  @UseGuards(JwtAuthGuard)
  displayGuildProperties(
    @Req() req: Request,
    @Body() { guildId }: DisplayGuildPropertiesDto,
  ): GuildProperties {
    const user = req.user as User;
    return this.guildsService.extractGuildProperties(user.id, guildId);
  }
}
