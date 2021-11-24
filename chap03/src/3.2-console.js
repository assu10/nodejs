const str = 'abc';
const num = 1;
const bool = true;
const obj = {
  outside: {
    inside: {
      key: 'value',
    },
  },
};

console.time('전체시간');

console.log(str, num, bool);
console.error('이것은 에러');

console.table([
  { name: 'assu', age: 20 },
  { name: 'jhlee', age: 21 },
]);

console.dir(obj, { colors: false, depth: 2 });
console.dir(obj, { colors: true, depth: 1 });

console.time('시간측정');
for (let i = 0; i < 100000; i++) {}
console.timeEnd('시간측정');

function b() {
  console.trace('에러 위치 추적');
}

function a() {
  b();
}

a();

console.timeEnd('전체시간');
