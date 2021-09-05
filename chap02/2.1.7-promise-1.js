// Promise 기본 구조

const condition = true;     // true 면 resolve, false 면 reject

const promise = new Promise((resolve, reject) => {  // 프로미스 생성
    if (condition) {
        resolve('성공');
    } else {
        reject('실패');
    }
});

// 다른 코드가 들어갈 수 있음 (즉, new Promise 는 바로 실행되지만 결과값은 then 을 붙였을 때 받는다.)

promise
    .then((message) => {
        console.log(message);   // 성공 출력, resolve 한 후에 실행
    })
    .catch((error) => {
        console.log(error);     // 실패 출력, reject 한 후에 실행
    })
    .finally(() => {
        console.log('무조건');
    });