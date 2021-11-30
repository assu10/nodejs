const http = require('http');
const fs = require('fs').promises;

const users = {}; // 데이터 저장용

http
  .createServer(async (req, res) => {
    try {
      if (req.method === 'GET') {
        if (req.url === '/') {
          const data = await fs.readFile('restFront.html');
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          return res.end(data);
        } else if (req.url === '/about') {
          const data = await fs.readFile('about.html');
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          return res.end(data);
        } else if (req.url === '/users') {
          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
          });
          return res.end(JSON.stringify(users));
        }
        // 위에 해당하지 않는 경우
        try {
          const data = await fs.readFile(`.${req.url}`);
          return res.end(data);
        } catch (err) {
          console.error('NOT FOUND', err);
        }
      } else if (req.method === 'POST') {
        if (req.url === '/user') {
          let body = '';
          // 요청 body 를 stream 형식으로 받음
          // req 와 res 도 내부적으로는 스트림 (readStream, writeStream) 으로 되어있으므로
          // 요청/응답의 데이터가 스트림 형식으로 전달됨
          req.on('data', data => {
            body += data;
          });
          // 요청 body 다 받은 후 실행
          return req.on('end', () => {
            console.log('POST body: ', body);
            const { name } = JSON.parse(body);
            const id = Date.now();
            users[id] = name;
            res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('ok');
          });
        }
      } else if (req.method === 'PUT') {
        if (req.url.startsWith('/user/')) {
          const key = req.url.split('/')[2];
          let body = '';
          req.on('data', data => {
            body += data;
          });
          return req.on('end', () => {
            console.log('PUT 본문(Body):', body);
            users[key] = JSON.parse(body).name;
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            return res.end('ok');
          });
        }
      } else if (req.method === 'DELETE') {
        if (req.url.startsWith('/user/')) {
          const key = req.url.split('/')[2];
          delete users[key];
          res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
          return res.end('ok');
        }
      }
      res.writeHead(404);
      return res.end('NOT FOUND');
    } catch (err) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.message);
    }
  })
  .listen(8080, () => {
    console.log('waiting 8080 port..');
  });
