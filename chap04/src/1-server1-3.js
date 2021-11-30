const http = require('http');

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('hello');
    res.end('END');
  })
  .listen(8080, () => {
    // 서버 연결
    console.log('waiting 8080 port...');
  });

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('hello');
    res.end('END');
  })
  .listen(8081, () => {
    // 서버 연결
    console.log('waiting 8081 port...');
  });
