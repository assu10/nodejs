const express = require('express');

const router = express.Router();

// GET / 라우터
/*router.get('/', (req, res) => {
  res.send('Hello, Express');
});*/

// 1.2. next('route')
/*router.get(
  '/',
  (req, res, next) => {
    res.send('hello1~'); // [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    next('route');
  },
  (req, res, next) => {
    console.log('실행되지 않음');
    next();
  },
  (req, res, next) => {
    console.log('실행되지 않음');
    next();
  },
);

router.get('/aa', (req, res) => {
  console.log('실행되지 않음');
  res.send('hello-aa~');
});

router.get('/', (req, res) => {
  console.log('실행됨');
  res.send('hello2~');
});*/

// 1.3. 라우터 주소 표현
router.get('/me/:id', (req, res) => {
  res.send('me~');
  console.log('req.params: ', req.params);
  console.log('req.query: ', req.query);
});

router.get('/me/haha', (req, res) => {
  res.send('실행되지 않음');
  console.log('req.params: ', req.params);
  console.log('req.query: ', req.query);
});

module.exports = router;
