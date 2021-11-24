const path = require('path');

console.log(`path.sep: ${path.sep}`); // 경로 구분자, 윈도우는 \, POSIX 는 /
console.log(`path.delimiter: ${path.delimiter}`); // 환경변수 구분자, 윈도우는 ;, POSIX 는 :, process.env.PATH 입력 시 여러 개의 경로가 이 구분자로 구분되어 있음
console.log(`process.env.PATH: ${process.env.PATH}`);
console.log('-------------------------');

console.log(`__filename: ${__filename}`); // 경로를 포함한 파일명
console.log(`path.dirname(__filename): ${path.dirname(__filename)}`); // 파일이 위치한 폴더 경로
console.log(`path.extname(__filename): ${path.extname(__filename)}`); // 파일 확장자
console.log(`path.basename(__filename): ${path.basename(__filename)}`); // 파일의 이름 (확장자 포함)
console.log(
  `path.basename(__filename, path.extname(__filename): ${path.basename(
    __filename,
    path.extname(__filename),
  )}`,
); // 확장자를 뺀 파일명
console.log('-------------------------');

console.log('path.parse(__filename): ', path.parse(__filename)); // 파일 경로를 root, dir, base(파일명), ext, name 으로 분리
console.log(
  `path.format(): ${path.format({
    dir: 'C://users/assu',
    name: 'path',
    ext: '.js',
  })}`,
); // path.parse() 한 객체를 파일 경로로 합침
console.log(
  `path.normalize(): ${path.normalize('C://users///assu///path.js')}`,
); // \ 나 / 를 실수로 여러 번 사용 시 정상적인 경로로 변환
console.log('-------------------------');

console.log(`path.isAbsolute(/home): ${path.isAbsolute('/home')}`); // 파일의 경로가 절대경로이면 true
console.log(`path.isAbsolute(./home): ${path.isAbsolute('./home')}`);
console.log('-------------------------');

console.log(
  `path.relative(): ${path.relative('C://users/assu/path.js', 'C://')}`,
); // 첫 번째 인자의 경로에서 두 번째 경로로 가는 방법
console.log(`__dirname: ${__dirname}`);
console.log(
  `path.join(): ${path.join(__dirname, '..', '..', '/users', '.', '/assu')}`,
); // 하나의 경로로 합치며, 상대경로인 .. 와 . 도 알아서 처리함
console.log(
  `path.resolve(): ${path.resolve(__dirname, '..', 'users', '.', '/assu')}`,
); // 뒤에 설명
