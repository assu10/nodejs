// for 문과 async/await 를 같이 사용하여 프로미스를 순차적으로 실행

const promise1 = Promise.resolve('success 1');
const promise2 = Promise.resolve('success 2');

(async () => {
    for await (promise of [promise1, promise2]) {
        console.log(promise);
    }
})();

// 결과
// success 1
// success 2
