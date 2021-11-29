const fs = require('fs');
const writeStream = fs.createWriteStream('./bigFile.txt');

for (let i = 0; i <= 10000000; i++) {
  writeStream.write(
    '엄청나게 큰 파일입니다. 엄청나게 큰 파일입니다. 엄청나게 큰 파일입니다.!\n ',
  );
}
writeStream.end();
