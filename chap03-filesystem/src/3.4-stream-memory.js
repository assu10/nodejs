const fs = require('fs');

console.log('before memory: ', process.memoryUsage().rss);

const readStream = fs.createReadStream('./bigFile.txt');
const writeStream = fs.createWriteStream('./bigFile3.txt');

readStream.pipe(writeStream);

readStream.on('end', () => {
  console.log('after memory: ', process.memoryUsage().rss);
});
