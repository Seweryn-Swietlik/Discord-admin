import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { BackupService } from './backup.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/models/User';
import { RestoreGuildDto } from './dto/restore-guild.dto';
import { CarateGuildBackupDto } from './dto/carate-guild-backup.dto';

@Controller('backup')
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  @Post('restore')
  @UseGuards(JwtAuthGuard)
  async restoreGuild(
    @Req() req: Request,
    @Body() restoreGuildDto: RestoreGuildDto,
  ) {
    const user = req.user as User;
    await this.backupService.restoreGuild(user, restoreGuildDto);
    return 'Server has been restored';
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllGuildsBackup(@Req() req: Request) {
    const user = req.user as User;
    return this.backupService.getAllGuildsBackup(user.id);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  carateGuildBackup(
    @Req() req: Request,
    @Body() { guildId }: CarateGuildBackupDto,
  ) {
    const user = req.user as User;
    return this.backupService.createGuildBackup(user.id, guildId);
  }
}
