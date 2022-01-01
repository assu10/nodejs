const mongoose = require('mongoose');

const connect = () => {
  // 개발 환경일때만 콘솔을 통해 몽구스가 생성하는 쿼리 내용 확인
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }

  // 몽구스와 몽고디비 연결
  // 접속을 시도하는 주소의 데이터베이스는 admin 이지만 실제 사용할 데이터베이스는 nodejs 이므로 dbName 사용
  mongoose.connect(
    'mongodb://assu:1234@localhost:27017/admin',
    {
      dbName: 'nodejs',
      useNewUrlParser: true,
    },
    error => {
      if (error) {
        console.error('몽고디비 연결 에러', error);
      } else {
        console.log('몽고디비 연결 성공');
      }
    },
  );
};

mongoose.connection.on('error', error => {
  console.error('몽고디비 연결 에러', error);
});

mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결 끊어짐, 연결 재시도...');
  connect();
});

module.exports = connect;
