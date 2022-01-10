const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User, Hashtag } = require('../models');

const router = express.Router();

// 라우터용 미들웨어, 템플릿 엔진에서 사용할 user, followerCount 등을 res.locals 로 설정
// res.locals 로 설정하는 이유는 각 변수가 모든 템플릿 엔진에서 공통으로 사용되기 때문
router.use((req, res, next) => {
  res.locals.user = req.user; // 넌적스에서 user 객체를 통해 사용자 정보에 접근할 수 있도록..
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  res.locals.followerIdList = req.user
    ? req.user.Followings.map(f => f.id)
    : [];
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

// 메인 페이지 로딩 + 게시글도 함께 로딩
router.get('/', async (req, res, next) => {
  try {
    console.log('----- req.isAuthenticated(): ', req.isAuthenticated());
    // SELECT `Post`.`id`, `Post`.`content`, `Post`.`img`, `Post`.`UserId`, `User`.`id` AS `User.id`,
    // `User`.`nick` AS `User.nick`
    // FROM `posts` AS `Post`
    //   LEFT OUTER JOIN `users` AS `User` ON `Post`.`UserId` = `User`.`id` AND (`User`.`deletedAt` IS NULL)
    // ORDER BY `Post`.`createdAt` DESC
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']],
    });
    res.render('main', {
      title: 'ASSU',
      twits: posts,
    });
  } catch (err) {
    console.error('main error', err);
    next(err);
  }
});

// 해시태그로 조회
router.get('/hashtag', async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect('/');
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      // 해시태그 조회 후 있으면 시퀄라이즈에서 제공하는 getPosts 메서드로 모든 게시글 조회
      // 조회하면서 작성자 정보를 합침
      console.log('-----include hashtag.getPosts');
      /*
      * SELECT `Post`.`id`, `Post`.`content`, `Post`.`img`, `Post`.`createdAt`, `Post`.`updatedAt`, `Post`.`UserId`, `User`.`id` AS `User.id`,
       `User`.`email` AS `User.email`, `User`.`nick` AS `User.nick`, `User`.`password` AS `User.password`, `User`.`provider` AS `User.provider`,
       `User`.`snsId` AS `User.snsId`, `User`.`createdAt` AS `User.createdAt`, `User`.`updatedAt` AS `User.updatedAt`,
       `User`.`deletedAt` AS `User.deletedAt`, `postHashtag`.`createdAt` AS `postHashtag.createdAt`, `postHashtag`.`updatedAt` AS `postHashtag.updatedAt`,
       `postHashtag`.`PostId` AS `postHashtag.PostId`, `postHashtag`.`HashtagId` AS `postHashtag.HashtagId`
FROM `posts` AS `Post`
    LEFT OUTER JOIN `users` AS `User`
        ON `Post`.`UserId` = `User`.`id`
               AND (`User`.`deletedAt` IS NULL)
    INNER JOIN `postHashtag` AS `postHashtag`
        ON `Post`.`id` = `postHashtag`.`PostId` AND `postHashtag`.`HashtagId` = 1;
      * */
      posts = await hashtag.getPosts({ include: [{ model: User }] });
    }

    return res.render('main', {
      title: `${query} | ASSU`,
      twits: posts,
    });
  } catch (err) {
    console.error('hashtag error', err);
    return next(err);
  }
});

module.exports = router;
