const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();
const pageRouter = require('./routes/page');
const { sequelize } = require('./models');

const passportConfig = require('./passport'); // require('./passport/index.js') 와 동일

const app = express();

passportConfig(); // 패스포트 설정

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('DB 연결 성공');
  })
  .catch(err => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
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
  }),
);

// 요청 (req 객체) 에 passport 설정
app.use(passport.initialize());

// req.session 객체에 passport 정보 저장
// req.session 객체는 express-session 에서 생성하는 것이므로
//   passport 미들웨어는 express-session 미들웨어보다 뒤에 연결
app.use(passport.session());

app.use('/', pageRouter);

// 위 라우터에 매핑되지 않으면 404 에러 (미들웨어는 위에서 아래로 순서대로 실행되므로)
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터 없음`);
  error.status = 404;
  next(error);
});

// 에러처리 미들웨어
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), ' 번 포트에서 대기 중...');
});
