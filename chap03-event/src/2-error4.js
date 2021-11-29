process.on('uncaughtException', err => {
  console.error('예측치 못한 에러', err);
});

setInterval(() => {
  throw new Error('ERROR');
}, 1000);

setTimeout(() => {
  console.log('실행됨');
}, 2000);
