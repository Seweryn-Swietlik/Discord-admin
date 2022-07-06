# Discord-admin

The discord admin application allows you to manage your own servers on discord through a bot

## The application allows you to:

1. create your own account for the application.

2. add a bot to the selected server and set the appropriate permissions.

3. display the servers

4. saving all attachments from the selected server to the database and listing them.

5. create, read, update, delete discord channels.

6. deleting, inviting and listing server members.

7. searching for messages on a server or on a selected channel. Create, update, delete messages.

8. create server backup. Saves guild data, channels, users and user roles in the database.

9. restore the server based on the database.

## Flow of the application:

During account creation, we provide the bot token. This can be a token of a bot that is already added to our server or one that we just want to add.

```javascript
class SignUpDto {
  username: string;
  password: string;
  botToken: string; //bot token that has been added or can be added to the user server. We can find the token at https://discord.com/developers/applications
  clientId: string; //client id needed to add bot to server or restore server. We can find client id at https://discord.com/developers/applications
}
```

During login the bot is created and added to the array of active bots. After a successful login using the authorization guard we receive an access token.

```javascript
class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  login(@Req() req: Request) {
    const user = req.user as User;
    this.botsRegistry.createBot(user);
    return this.authService.login(req.user);
  }
}
```

Thanks to the access token every time the method is called we find the right bot from the array using the user id. This allows any user to use the application.

```javascript
class MembersService {
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
}
```

More detailed documentation: https://github.com/Seweryn-Swietlik/Discord-admin/tree/main/documentation
