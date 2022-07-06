## Attachments

#### Save attachments

Saving all attachments available on the selected server.

endpoint: post: discord/attachments

##### Input payload

```javascript
class AttachmentsDto {
  @IsNotEmpty()
  @IsString()
  guildId: string;
}
```

Output: returns information 'The attachments have been saved';

#### Get attachments

List all attachments stored in db based on guild id.

endpoint: get: discord/attachments

##### Input payload

```javascript
class AttachmentsDto {
  @IsNotEmpty()
  @IsString()
  guildId: string;
}
```

Output: Returns the attachments data stored in the database
