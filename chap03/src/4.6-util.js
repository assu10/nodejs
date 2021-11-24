const util = require('util');
const crypto = require('crypto');

const dontUserMe = util.deprecate((a, b) => {
  console.log(a + b);
}, 'dontUseMe 함수는 deprecated 되었으니 더 이상 사용 금지');

dontUserMe(1, 2);

const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)
  .then(buf => {
    console.log(buf.toString('base64'));
  })
  .catch(err => {
    console.error(err);
  });
