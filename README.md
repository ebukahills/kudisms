# kudisms
API Wrapper for [Kudi SMS](www.kudisms.com) bulk messaging

## Usage
```sh
npm install -s kudisms
```

```javascript
var KudiSms = require('kudisms')

var kudi = new KudiSms(KUDI_USERNAME, KUDI_PASSWORD, SENDER_ID)

// Send SMS
kudi.sendSms(numbers, message).then(...).catch(...)
// numbers: String || [String]
// message: String

// Check SMS Balance
kudi.checkBalance().then(...).catch(...)

// Set Custom Options
kudi.setOptions({
  username,
  password,
  senderId,
  // ... Other Options (Future Version)
})
```
### TODO
- Full Documentation

- Test Coverage

Contributors are appreciated 😁