const url = require('url');

const { URL } = url;
const myURL = new URL('http://www.assu.co.kr/node/study.js?q1=haha#anchor');
console.log('new URL(): ', myURL); // WHATWG 방식의 url
console.log('url.format(): ', url.format(myURL));

console.log('----------');

// 기존 노드 방식
const parsedUrl = url.parse(
  'http://www.assu.co.kr/node/study.js?q1=haha#anchor',
);
console.log('url.parse(): ', parsedUrl);
console.log('url.format(): ', url.format(parsedUrl));
