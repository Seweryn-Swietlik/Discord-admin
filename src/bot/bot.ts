import { Client, Intents } from 'discord.js';

export class Bot extends Client {
  constructor(token: string) {
    super({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_PRESENCES,
      ],
    });
    this.start(token);
  }

  private async start(token: string) {
    await this.login(token);
  }
}
