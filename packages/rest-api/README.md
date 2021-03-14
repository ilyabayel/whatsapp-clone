# Whatsapp Clone RestAPI server

This whatsapp clone backend. <br>
Author: Ilya Kozlov <ilya@kozlov.dev>

## Description
### Responsibility
- Auth
- Users
- Rooms
- Message History

### Configs
#### Auth Constants
```javascript
export const jwtConstants = {
  secret: '<some secret word>',
  expiresIn: '<access token lifetime>', // 600s or 10m
};

export const mongoConstants = {
  uri: '<your mongodb server uri>',
};
```
