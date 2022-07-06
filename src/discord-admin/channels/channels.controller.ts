import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Delete,
  Patch,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetAllCategories } from './types';
import { AddChannelCategoryDto } from './dto/add-channel-category.dto';
import { AddChannelDto } from './dto/add-channel.dto';
import { DeleteChannelDto } from './dto/delete-channel.dto';
import { EditChannelDto } from './dto/edit-channel.dto';
import { GetAllCategoriesDto } from './dto/get-all-categories.dto';
import { ChannelsService } from './channels.service';
import { Request } from 'express';
import { User } from 'src/schemas/user.schema';

@Controller('discord/channels')
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  addChannel(
    @Body() addChannelDto: AddChannelDto,
    @Req() req: Request,
  ): Promise<string> {
    const user = req.user as User;
    return this.channelsService.addChannel(addChannelDto, user.id);
  }

  @Post('add-category')
  @UseGuards(JwtAuthGuard)
  addChannelCategory(
    @Body() addChannelCategoryDto: AddChannelCategoryDto,
    @Req() req: Request,
  ): Promise<string> {
    const user = req.user as User;
    return this.channelsService.addChannelCategory(
      addChannelCategoryDto,
      user.id,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllCategories(
    @Body() getAllCategoriesDto: GetAllCategoriesDto,
    @Req() req: Request,
  ): Array<GetAllCategories> {
    const user = req.user as User;
    return this.channelsService.getAllCategories(getAllCategoriesDto, user.id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  editChannel(
    @Body() editChannelDto: EditChannelDto,
    @Req() req: Request,
  ): Promise<string> {
    const user = req.user as User;
    return this.channelsService.editChannel(editChannelDto, user.id);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteChannel(
    @Body() deleteChannelDto: DeleteChannelDto,
    @Req() req: Request,
  ): Promise<string> {
    const user = req.user as User;
    return this.channelsService.deleteChannel(deleteChannelDto, user.id);
  }
}
