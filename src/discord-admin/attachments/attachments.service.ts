import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Collection, Message, MessageAttachment } from 'discord.js';
import { Model } from 'mongoose';
import { BotsRegistry } from 'src/bot/bots-registry';
import { Attachment } from 'src/schemas/attachment.schema';
import { Finder } from '../utilities/finder';
import { MessageFinder } from '../messages/message-finder';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectModel('Attachment')
    private readonly attachmentModel: Model<Attachment>,
    private readonly botsRegistry: BotsRegistry,
    private readonly finder: Finder,
    private messageFinder: MessageFinder,
  ) {}

  async saveAttachments(userId: string, guildId: string) {
    const bot = this.botsRegistry.getBot(userId);
    const guild = this.finder.findGuild(bot.guilds, guildId);
    const channels = guild.channels;
    const textMessages = await this.messageFinder.getTextChannelsMessages(
      channels,
    );

    const attachmentsToSave = await this.getAttachmentsToSave(
      guild.id,
      textMessages,
    );

    const savedAttachments = await this.createSavedAttachments(
      guild.id,
      attachmentsToSave,
    );
    await Promise.all(savedAttachments);
  }

  async getAttachmentsFromDB(userId: string, guildId: string) {
    const bot = this.botsRegistry.getBot(userId);
    const guild = this.finder.findGuild(bot.guilds, guildId);
    const attachments = await this.findAttachmentsInDb(guild.id);
    return attachments;
  }

  private async createSavedAttachments(
    guildId: string,
    attachmentsToSave: Array<MessageAttachment>,
  ) {
    const savedAttachments = attachmentsToSave.map((attachmentToSave) => {
      return new this.attachmentModel({
        guildId: guildId,
        attachmentId: attachmentToSave.id,
        url: attachmentToSave.url,
        name: attachmentToSave.name,
      });
    });
    return savedAttachments;
  }

  private async getAttachmentsToSave(
    guildId: string,
    textMessages: Collection<string, Message<boolean>>[],
  ) {
    const attachmentsFromDb = await this.findAttachmentsInDb(guildId);
    const attachmentsFromDiscord =
      this.getAllAttachmentsFromDiscord(textMessages);

    return attachmentsFromDiscord.reduce<Array<MessageAttachment>>(
      (acc, curr) => {
        const attachment = attachmentsFromDb.some(
          (attachmentFromDb) => attachmentFromDb.attachmentId === curr.id,
        );
        if (!attachment) {
          acc.push(curr);
        }
        return acc;
      },
      [],
    );
  }

  private getAllAttachmentsFromDiscord(
    textMessages: Array<Collection<string, Message<boolean>>>,
  ) {
    return textMessages
      .map((messages) => {
        return messages
          .map((message) => message.attachments.map((attachment) => attachment))
          .flat();
      })
      .flat();
  }

  private findAttachmentsInDb(guildId: string) {
    return this.attachmentModel.find({
      where: { discordServerId: guildId },
    });
  }
}
