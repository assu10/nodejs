const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
  // 로그인 시 실행 (사용자 정보 객체를 세션에 아이디로 저장)
  // req.session(세션) 에 어떤 데이터를 저장할 지 결정
  // 매개변수로 user 를 받아서 user.id 를 세션에 저장
  passport.serializeUser((user, done) => {
    console.log('passport.serializeUser');
    done(null, user.id); // 첫 번째 인수는 에러 발생 시 사용, 두 번째 인수는 세션에 저장하고 싶은 데이터
  });

  // 매 요청 시 실행 (세션에 저장한 아이디를 통해 사용자 정보 객체 조회, 세션에 불필요한 데이터를 담아두지 않기 위한 과정)
  // passport.session 미들웨어가 호출함
  // serializeUser 의 done 의 두 번째 인수로 넣었던 데이터가 deserializeUser 의 매개변수가 됨
  // 위의 serializeUser 에서 세션에 저장했던 아이디를 받아 DB 에서 사용자 정보 조회한 후 req.user 에 저장
  // 앞으로 req.user 를 통해 로그인한 사용자의 정보 조회 가능
  passport.deserializeUser((id, done) => {
    console.log('passport.deserializeUser');
    User.findOne({ where: { id } })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
  kakao();
};
