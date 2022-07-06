import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DeleteMemberDto } from './dto/delete-member.dto';
import { FindAllMembersDto } from './dto/find-all-members.dto';
import { InviteMemberDto } from './dto/invite-member.dto';
import { MembersService } from './members.service';
import { Request } from 'express';
import { User } from 'src/models/User';

@Controller('discord/members')
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  inviteMember(
    @Req() req: Request,
    @Body() inviteMemberDto: InviteMemberDto,
  ): Promise<string> {
    const user = req.user as User;
    return this.membersService.inviteMember(inviteMemberDto, user.id);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteMember(
    @Req() req: Request,
    @Body() deleteMemberDto: DeleteMemberDto,
  ): Promise<string> {
    const user = req.user as User;
    return this.membersService.deleteMember(deleteMemberDto, user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllMembers(
    @Req() req: Request,
    @Body() findAllMembersDto: FindAllMembersDto,
  ) {
    const user = req.user as User;
    return this.membersService.findAllMembers(findAllMembersDto, user.id);
  }
}
