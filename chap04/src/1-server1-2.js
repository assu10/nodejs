const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('hello');
  res.end('END');
});
server.listen(8080);

server.on('listening', () => {
  console.log('waiting 8080 port...');
});

server.on('error', err => {
  console.error(err);
});
