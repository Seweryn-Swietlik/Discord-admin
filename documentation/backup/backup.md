## Backup

#### Listing backup

Listing of all backups.

endpoint: get: backup

Output: Returns the guild data stored in the database

#### Restore backup

Restores server backup from database based on id.

endpoint: post: backup/restore

##### Input payload

```javascript
class RestoreGuildDto {
  backupId: string;

  clientSecret: string;         //A unique client key that allows automatic restoration of the server. We can find client secret at https://discord.com/developers/applications
```

Output: returns information 'Server has been restored';

#### Backup creation

Create backup based on guild id. Saves guild data, channels, users and user roles in the database.

endpoint: post: backup/create

##### Input payload

```javascript
class CarateGuildBackupDto {
  guildId: string;
}
```

##### Output payload

```javascript
type CarateGuildBackupOutputPayload = {
  backupId: string,
};
```
