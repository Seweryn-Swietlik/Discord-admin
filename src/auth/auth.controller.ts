import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  Post,
  Body,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BotsRegistry } from 'src/bot/bots-registry';
import { User } from 'src/models/User';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private botsRegistry: BotsRegistry,
  ) {}

  @Post('sign-up')
  signIn(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('set-bot')
  @UseGuards(JwtAuthGuard)
  setDiscordBotToServer(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;
    const clientId = user.clientId;
    res.redirect(
      `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fredirect&response_type=code&scope=identify%20email%20connections%20bot%20guilds%20guilds.join%20guilds.members.read%20gdm.join%20applications.commands%20applications.builds.read%20messages.read`,
    );
  }

  @Get('redirect')
  discordLoginRedirect() {
    return 'The bot has been added correctly';
  }

  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  login(@Req() req: Request) {
    const user = req.user as User;
    this.botsRegistry.createBot(user);
    return this.authService.login(req.user);
  }

  @Get('log-out')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req: Request, @Res() res: Response) {
    req.logOut();
    res.redirect('http://localhost:3000/auth/log-in');
  }
}
