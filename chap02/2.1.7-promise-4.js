// 프로미스 여러개 한꺼번에 사용하기 (Promise.all)

const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');

Promise.all([promise1, promise2])
    .then((result) => {
        console.log(result);    // [ '성공1', '성공2' ]
    })
    .catch((error) => {
        console.error(error);       // 프로미스 중 하나라도 reject 되면 호출
    });