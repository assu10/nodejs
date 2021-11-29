const fs = require('fs');

console.log('before memory: ', process.memoryUsage().rss);
console.log('before memory: ', process.memoryUsage());

const bufData = fs.readFileSync('./bigFile.txt');
fs.writeFileSync('./bigFile2.txt', bufData);

console.log('after memory: ', process.memoryUsage().rss);
