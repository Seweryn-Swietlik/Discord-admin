import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FindMessageInChannelDto } from './dto/find-messages-in-channel.dto';
import { FindMessagesInGuildDto } from './dto/find-messages-in-guild.dto';
import { AddMessageDto } from './dto/add-message.dto';
import { DeleteMessageDto } from './dto/delete-message.dto';
import { EditMessageDto } from './dto/edit-message.dto';
import { MessagesService } from './messages.service';
import { Request } from 'express';
import { User } from 'src/models/User';

@Controller('discord/messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  addMessage(
    @Req() req: Request,
    @Body() addMessageDto: AddMessageDto,
  ): Promise<string> {
    const user = req.user as User;
    return this.messagesService.addMessage(addMessageDto, user.id);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteMessage(
    @Req() req: Request,
    @Body() deleteMessageDto: DeleteMessageDto,
  ): Promise<string> {
    const user = req.user as User;
    return this.messagesService.deleteMessage(deleteMessageDto, user.id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  editMessage(
    @Req() req: Request,
    @Body() editMessageDto: EditMessageDto,
  ): Promise<string> {
    const user = req.user as User;
    return this.messagesService.editMessage(editMessageDto, user.id);
  }

  @Get('channel')
  @UseGuards(JwtAuthGuard)
  findMessageInChannel(
    @Req() req: Request,
    @Body() findMessageInChannelDto: FindMessageInChannelDto,
  ) {
    const user = req.user as User;
    return this.messagesService.findMessageInChannel(
      findMessageInChannelDto,
      user.id,
    );
  }

  @Get('guild')
  @UseGuards(JwtAuthGuard)
  findMessagesInGuild(
    @Req() req: Request,
    @Body() findMessagesInGuildDto: FindMessagesInGuildDto,
  ) {
    const user = req.user as User;
    return this.messagesService.findMessageInGuild(
      findMessagesInGuildDto,
      user.id,
    );
  }
}
