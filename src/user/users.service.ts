import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async createUser(
    username: string,
    passwordHash: string,
    botToken: string,
    clientId: string,
  ): Promise<string> {
    const user = new this.userModel({
      username,
      password: passwordHash,
      botToken,
      clientId,
    });
    await user.save();
    return user._id;
  }

  async findUser(username: string) {
    return await this.userModel.findOne({ username });
  }
}
