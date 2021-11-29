const EventEmitter = require('events');

const myEvent = new EventEmitter();
myEvent.addListener('event1', () => {
  console.log('이벤트1');
});
// event2 에 여러 개의 이벤트 리스너 등록
myEvent.on('event2', () => {
  console.log('이벤트2');
});
myEvent.on('event2', () => {
  console.log('이벤트2 추가');
});
// 한 번만 실행됨
myEvent.once('event3', () => {
  console.log('이벤트3');
});

myEvent.emit('event1'); // 이벤트 호출
myEvent.emit('event2');

myEvent.emit('event3');
myEvent.emit('event3'); // 실행 안 됨

myEvent.on('event4', () => {
  console.log('이벤트4');
});
myEvent.removeAllListeners('event4');
myEvent.emit('event4'); // 실행 안 됨

const listener = () => {
  console.log('event5');
};
myEvent.on('event5', listener);
myEvent.removeListener('event5', listener);
myEvent.emit('event5'); // 실행 안 됨

console.log(myEvent.listenerCount('event2'));
