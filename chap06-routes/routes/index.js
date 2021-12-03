const express = require('express');

const router = express.Router();

// GET / 라우터
/*router.get('/', (req, res) => {
  res.send('Hello, Express');
});*/

router.get(
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
});

module.exports = router;
