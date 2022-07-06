## User authentication

#### User registration

Registering users for the application.

endpoint: post: auth/sing-up

##### Input payload

```javascript
class SignUpDto {
  username: string;
  password: string;
  botToken: string; //bot token that has been added or can be added to the user server. We can find the token at https://discord.com/developers/applications
  clientId: string; //client id needed to add bot to server or restore server. We can find client id at https://discord.com/developers/applications
}
```

##### Output payload

```javascript
type SingUpOutputPayload = {
  userId: string,
};
```

#### Set up the bot

This endpoint allows you to add a bot to your server and grant it the appropriate permissions.

endpoint: post: auth/set-bot

Output: Redirection to discord authorization page

#### Login user

Allows the user to log in based on the data provided when creating the account.

endpoint: post: auth/log-in

##### Input payload

```javascript
type LoginData = {
  username: string,
  password: password,
};
```

##### Output payload

```javascript
type LoginOutputPayload = {
  access_token: string, //logged-in user token to enable authorization with other endpoints
};
```

#### Login out

Logging out the user and returning to the login page.

endpoint: get: auth/log-out

Output: Redirection to login page
