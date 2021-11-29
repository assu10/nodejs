const fs = require('fs').promises;

fs.copyFile('readme.txt', 'writeme4.txt')
  .then(() => {
    console.log('파일 복사');
  })
  .catch(err => {
    console.error(err);
  });
