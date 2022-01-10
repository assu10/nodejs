const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      // 전략에 관한 설정
      {
        usernameField: 'email', //   각각 usernameField, passwordField 에 해당하는 로그인 라우터의 req.body 속성명 적음
        passwordField: 'password',
      },
      // 실제 전략 수행, 위에서 넣어준 email, password 가 각각 async 함수의 첫 번째와 두 번째 매개변수가 됨
      // done() 은 passport.authenticate() 의 콜백 함수임
      async (email, password, done) => {
        try {
          const existUser = await User.findOne({ where: { email } });
          console.log('existUser.password: ', existUser.password);
          console.log('password: ', password);
          if (existUser) {
            const passwordCompare = await bcrypt.compare(
              password,
              existUser.password,
            );
            if (passwordCompare) {
              done(null, existUser);
            } else {
              done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
            }
          } else {
            done(null, false, { message: '가입되지 않은 회원입니다.' });
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      },
    ),
  );
};
