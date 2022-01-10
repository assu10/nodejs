const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
  fs.readdirSync('uploads');
} catch (err) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/'); // 에러가 있으면 첫 번째 인수에 에러 전달
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// 이미지 업로드
router.post('/img', isLoggedIn, upload.single('img'), (req, res, next) => {
  console.log('req.file: ', req.file);
  res.json({ url: `/img/${req.file.filename}` });
});

// 이미지 업로드 후 게시글 저장
const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });

    const hashtags = req.body.content.match(/#[^\s#]*/g);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag => {
          // 데이터가 존재하면 조회만 하고, 존재하지 않으면 생성 후 조회하여 리턴
          return Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() }, // # 을 떼고 소문자로 변경
          });
        }),
      );
      console.log('result: ', result);
      // result 의 결과값은 [모델, 성셩여부] 이므로 r[0] 으로 모델만 추출
      await post.addHashtags(result.map(r => r[0]));
    }
    res.redirect('/');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
