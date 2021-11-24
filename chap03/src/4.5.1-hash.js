const crypto = require('crypto');

console.log(
  'base64: ',
  crypto.createHash('sha512').update('password').digest('base64'),
);

console.log(
  'hex: ',
  crypto.createHash('sha512').update('password').digest('hex'),
);

console.log(
  'other base64: ',
  crypto.createHash('sha512').update('other_password').digest('base64'),
);
