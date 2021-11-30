const http = require('http');
const fs = require('fs').promises;

http
  .createServer(async (req, res) => {
    try {
      const data = await fs.readFile('server2.html');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data); // 저장된 버퍼를 그대로 클라이언트로 전달
    } catch (err) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.message);
    }
  })
  .listen(8080, () => {
    console.log('wait 8080 port...');
  });
