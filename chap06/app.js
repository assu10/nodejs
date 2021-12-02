const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: 'session-cookie',
  }),
);

try {
  fs.readdirSync('uploads');
} catch (err) {
  console.error('uploads 폴더가 없으므로 uploads 폴더 생성');
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

app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'multipart.html'));
});

// 하나의 파일만 업로드 하는 경우
app.post('/upload', upload.single('imagename'), (req, res) => {
  console.log('req.file: ', req.file);
  console.log('req.body: ', req.body);
  res.send('ok');
});

app.get(
  '/',
  (req, res, next) => {
    console.log('GET / 요청에서만 실행됩니다.');
    next();
  },
  () => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
  },
);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
