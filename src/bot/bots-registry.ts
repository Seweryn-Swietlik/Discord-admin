import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/models/User';
import { Bot } from './bot';

type ActiveBot = {
  userId: string;
  bot: Bot;
};

@Injectable()
export class BotsRegistry {
  private activeBots: Array<ActiveBot> = [];

  createBot(user: User) {
    const { id, botToken } = user;
    const activeBot = this.findActiveBot(id);
    if (!activeBot) {
      const bot = new Bot(botToken);
      this.activeBots.push({ userId: id, bot });
    }
  }

  getBot(userId: string) {
    const activeBot = this.findActiveBot(userId);
    if (!activeBot) {
      throw new NotFoundException();
    }
    return activeBot.bot;
  }

  findActiveBot(userId: string) {
    return this.activeBots.find((activeBot) => activeBot.userId === userId);
  }
}
