import { Injectable, NotFoundException } from '@nestjs/common';
import { BotsRegistry } from 'src/bot/bots-registry';
import { DeleteMemberDto } from './dto/delete-member.dto';
import { FindAllMembersDto } from './dto/find-all-members.dto';
import { InviteMemberDto } from './dto/invite-member.dto';
import { Finder } from '../utilities/finder';

@Injectable()
export class MembersService {
  constructor(
    private readonly finder: Finder,
    private readonly botsRegistry: BotsRegistry,
  ) {}

  async inviteMember(
    inviteMemberDto: InviteMemberDto,
    userId: string,
  ): Promise<string> {
    try {
      const bot = this.botsRegistry.getBot(userId);

      const { guildId, channelId } = inviteMemberDto;
      const guild = this.finder.findGuild(bot.guilds, guildId);
      const invites = await guild.invites.create(channelId);
      return invites.url;
    } catch {
      throw new NotFoundException();
    }
  }

  async deleteMember(
    deleteMemberDto: DeleteMemberDto,
    userId: string,
  ): Promise<string> {
    const bot = this.botsRegistry.getBot(userId);

    const { guildId, memberToDeleteId } = deleteMemberDto;
    const guild = this.finder.findGuild(bot.guilds, guildId);

    const member = guild.members.cache.find(
      (member) => member.user.id === memberToDeleteId,
    );
    if (!member) {
      throw new NotFoundException('There is no such user');
    }
    await guild.members.kick(member);
    return memberToDeleteId;
  }

  async findAllMembers(findAllMembersDto: FindAllMembersDto, userId: string) {
    const bot = this.botsRegistry.getBot(userId);

    const { guildId } = findAllMembersDto;
    const guild = this.finder.findGuild(bot.guilds, guildId);

    const members = await guild.members.fetch();
    return members.map((member) => member.user);
  }
}
