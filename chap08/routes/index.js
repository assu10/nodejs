const express = require('express');
const User = require('../schemas/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    // 시퀄라이즈는 const users = await User.findAll();
    // 몽고디비에서는 db.users.find({})
    const users = await User.find({});
    res.render('mongoose', { users });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
