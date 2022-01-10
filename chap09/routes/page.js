const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

// 라우터용 미들웨어, 템플릿 엔진에서 사용할 user, followerCount 등을 res.locals 로 설정
// res.locals 로 설정하는 이유는 각 변수가 모든 템플릿 엔진에서 공통으로 사용되기 때문
router.use((req, res, next) => {
  res.locals.user = req.user; // 넌적스에서 user 객체를 통해 사용자 정보에 접근할 수 있도록..
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});

// 내 프로필 보기
// 로그인이 된 상태이어야 next() 가 호출되어 res.render 가 있는 미들웨어로 넘어갈 수 있음
router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: '내 정보 - ASSU' });
});

// 회원가입 하기
router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', { title: '회원가입 - ASSU' });
});

router.get('/', (req, res, next) => {
  const twits = [];
  res.render('main', {
    title: 'ASSU',
    twits,
  });
});

module.exports = router;
