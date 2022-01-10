const express = require('express');

const { isLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

// 다른 사용자를 팔로우하는 기능
router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10)); // user 모델의 관계 설정에서 as 옵션에 따라 이름 결정
      res.send('success');
    } else {
      res.status(404).send('no user');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
