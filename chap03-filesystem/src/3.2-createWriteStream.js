const fs = require('fs');

const writeStream = fs.createWriteStream('./writeme2.txt');
writeStream.on('finish', () => {
  console.log('파일 쓰기 완료');
});

writeStream.write('글을 쓰자.\n');
writeStream.write('이어서...');
writeStream.end();
