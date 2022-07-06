import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signUp.dto';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<string> {
    const { username, password, botToken, clientId } = signUpDto;
    await this.validateUsername(username);
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);
    const userId = await this.usersService.createUser(
      username,
      passwordHash,
      botToken,
      clientId,
    );
    return userId;
  }

  async validateUser(username: string, userPassword: string) {
    const user = await this.usersService.findUser(username);
    if (!user) {
      throw new NotFoundException();
    }
    const isMatch = await bcrypt.compare(userPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException('The password does not match the username');
    }
    return {
      id: user.id,
      username: user.username,
      botToken: user.botToken,
      clientId: user.clientId,
    };
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      id: user.id,
      botToken: user.botToken,
      clientId: user.clientId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async validateUsername(username: string) {
    const user = await this.usersService.findUser(username);
    if (user) {
      throw new BadRequestException(
        'This username already exist. Try another one',
      );
    }
  }
}
