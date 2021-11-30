const http = require('http');

http
  .createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, { 'Set-Cookie': 'mycookie:test' });
    res.end('쿠키 완료');
  })
  .listen(8080, () => {
    console.log('8080...');
  });
