const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const nunjucks = require('nunjucks');

dotenv.config();

const indexRouter = require('./routes'); // index.js 는 생략 가능
const userRouter = require('./routes/users');

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

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

app.use('/', indexRouter);
app.use('/user', userRouter);

/*
// 위 라우터에 매핑되지 않으면 404 에러 (미들웨어는 위에서 아래로 순서대로 실행되므로)
app.use((req, res, next) => {
  res.status(404).send('NOT FOUND.');
});

// 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});
 */

// 위 라우터에 매핑되지 않으면 404 에러 (미들웨어는 위에서 아래로 순서대로 실행되므로)
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// 에러 핸들러
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error'); // error.html 렌더링
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
