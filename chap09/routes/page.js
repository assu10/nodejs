const express = require('express');

const router = express.Router();

// 라우터용 미들웨어, 템플릿 엔진에서 사용할 user, followerCount 등을 res.locals 로 설정
// res.locals 로 설정하는 이유는 각 변수가 모든 템플릿 엔진에서 공통으로 사용되기 때문
router.use((req, res, next) => {
  res.locals.user = null;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});

router.get('/profile', (req, res) => {
  res.render('profile', { title: '내 정보 - ASSU' });
});

router.get('/join', (req, res) => {
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
