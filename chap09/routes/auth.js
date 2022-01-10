const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

// 회원 가입
router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const existUser = await User.findOne({ where: { email } });
    if (existUser) {
      return res.redirect('/join?error=exist');
    }
    // 두 번째 인수는 hash 반복 횟수, 12 이상을 추천하며 최대 31까지 가능
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect('/');
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

// 로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
  // authError 이 있다면 오류
  // user 가 있다면 로그인 성공이므로 req.login 메서드 호출
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }

    // req.login 메서드는 user 객체를 넣어서 passport.serializeUser() 호출
    return req.login(user, loginError => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next) 를 붙인다.
});

// 로그아웃
router.get('/logout', isLoggedIn, (req, res, next) => {
  req.logout(); // req.user 객체 제거
  req.session.destroy(); // req.session 객체 내용 제거
  res.redirect('/');
});

// 카카오 로그인 시작 (카카오 로그인 창으로 리다이렉트)
router.get('/kakao', passport.authenticate('kakao'));

// 카카오 로그인 성공 여부 결과받을 라우터 주소
// 로컬 로그인과 다르게 passport.authenticate 메서드에 콜백 함수를 제공하지 않음
// 왜냐면 카카오 로그인은 로그인 성공 시 내부적으로 req.login 을 호출하기 때문에 우리가 직접 호출할 필요가 없음
router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/', // 콜백 함수 대신 로그인 실패 시 어디로 이동할 지 설정
  }),
  // 로그인 성공 시 어디로 이동할 지 다음 미들웨어에 설정
  (req, res) => {
    res.redirect('/');
  },
);
module.exports = router;
