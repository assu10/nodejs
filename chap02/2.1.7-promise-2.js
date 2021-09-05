// then 이나 catch 에서 다른 then, catch 를 붙여서 이전 then 의 return 값을 다음 then 의 매개변수로 넘길 수 있다.

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
        return new Promise(((resolve, reject) => {
            resolve(message);
        }));
    })
    .then((message2) => {       // message 를 message2 가 받음, 단 then 에서 new Promise 를 return 해야 다음 then 에서 받을 수 있음
        console.log('message2', message2);
        return new Promise(((resolve, reject) => {
            resolve(message2);
        }))
    })
    .then((message3) => {
        console.log('message3', message3);
    })
    .catch((error) => {
        console.error('error', error);
    });

// 결과
// message2 성공
// message3 성공