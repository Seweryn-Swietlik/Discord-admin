#### Members

#### Get members

List all members from a given guild.

endpoint: get: discord/members

##### Input payload

```javascript
class FindAllMembersDto {
  guildId: string;
}
```

Output: Returns the members data stored in the database.

#### Invite member

Creates link with invitation to server.

endpoint: post: discord/members

##### Input payload

```javascript
class InviteMemberDto {
  guildId: string;
  channelId: string;
}
```

##### Output payload

```javascript
type InviteMemberOutputPayload = {
  inviteUrl: string,
};
```

#### Delete member

Delete a member from the specified guild based on id.

endpoint: delete: discord/members

##### Input payload

```javascript
class DeleteMemberDto {
  guildId: string;
  memberToDeleteId: string;
}
```

##### Output payload

```javascript
type DeleteMemberOutputPayload = {
  deletedMemberId: string,
};
```
