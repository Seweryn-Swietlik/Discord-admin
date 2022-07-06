import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/models/User';
import { AttachmentsService } from './attachments.service';
import { AttachmentsDto } from './dto/attachmentsDto';
import { Request } from 'express';

@Controller('discord/attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  saveAttachments(@Req() req: Request, @Body() { guildId }: AttachmentsDto) {
    const user = req.user as User;
    this.attachmentsService.saveAttachments(user.id, guildId);
    return 'The attachments have been saved';
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAttachments(@Req() req: Request, @Body() { guildId }: AttachmentsDto) {
    const user = req.user as User;
    return this.attachmentsService.getAttachmentsFromDB(user.id, guildId);
  }
}
