const A = require('./3.1-globalA');

global.message = '안녕하세요';
console.log(A()); // 안녕하세요.
