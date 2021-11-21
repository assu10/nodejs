const { URL } = require('url');

const myURL = new URL(
  'http://www.assu.co.kr/?page=3&limit=10&category=nodejs&category=javascript',
);
console.log('searchParams: ', myURL.searchParams);
console.log('searchParams.getAll(): ', myURL.searchParams.getAll('category')); // 키에 해당하는 모든 값 조회
console.log('searchParams.get(): ', myURL.searchParams.get('limit')); // 키에 해당하는 첫 번째 값만 조회
console.log('searchParams.has(): ', myURL.searchParams.has('page'));

console.log('searchParams.keys(): ', myURL.searchParams.keys()); // 모든 키를 반복기 객체로 가져옴
console.log('searchParams.values(): ', myURL.searchParams.values()); // 모든 값을 반복기 객체로 가져옴

myURL.searchParams.append('estype', 'es3'); // 키 추가, 같은 키가 있으면 유지하고 하나 더 추가
myURL.searchParams.append('estype', 'es5');
console.log('searchParams.getAll(): ', myURL.searchParams.getAll('estype'));

myURL.searchParams.set('estype', 'es6'); // 키 추가, 같은 키가 있으면 모두 삭제하고 새로 추가
console.log('searchParams.getAll(): ', myURL.searchParams.getAll('estype'));

myURL.searchParams.delete('estype'); // 해당 키 모두 제거
console.log('searchParams.getAll(): ', myURL.searchParams.getAll('estype'));

console.log('myURL.searchParams.toString(): ', myURL.searchParams.toString()); // searchParams 객체를 문자열로 만듦, search 에 대입하면 주소 객체에 반영됨
myURL.search = myURL.searchParams.toString();
