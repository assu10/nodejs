const fs = require('fs').promises;
const CONSTANTS = require('fs').constants;

fs.access('./folder', CONSTANTS.F_OK | CONSTANTS.W_OK | CONSTANTS.R_OK)
  .then(() => {
    console.log(
      '111',
      CONSTANTS.F_OK,
      CONSTANTS.W_OK,
      CONSTANTS.R_OK,
      CONSTANTS.F_OK | CONSTANTS.W_OK | CONSTANTS.R_OK,
    );
    return Promise.reject('이미 폴더 있음');
  })
  .catch(err => {
    console.log(
      '222',
      CONSTANTS.F_OK,
      CONSTANTS.W_OK,
      CONSTANTS.R_OK,
      CONSTANTS.F_OK | CONSTANTS.W_OK | CONSTANTS.R_OK,
    );
    if (err.code === 'ENOENT') {
      console.log('폴더 없음');
      return fs.mkdir('./folder');
    }
    return Promise.reject(err);
  })
  .then(() => {
    console.log('폴더 생성');
    return fs.open('./folder/file.js', 'w');
  })
  .then(fd => {
    console.log('빈 파일 생성', fd);
    return fs.rename('./folder/file.js', './folder/newfile.js');
  })
  .then(() => {
    console.log('이름 변경');
  })
  .catch(err => {
    console.error(err);
  });
