// 콜백 함수를 프로미스로 변경

// 콜백함수가 3번 중첩되었고, 각 콜백 함수마다 에러도 따로 처리해주어야 한다.
function findAndSaveUser(Users) {
    Users.findOne({}, (err, user) => { // 첫 번째 콜백
        if (err) {
            return console.error(err);
        }
        user.name = 'zero';
        user.save((err) => { // 두 번째 콜백
            if (err) {
                return console.error(err);
            }
            Users.findOne({ gender: 'm' }, (err, user) => { // 세 번째 콜백
                // 생략
            });
        });
    });
}

// then 메서드들은 순차적으로 실행되며, 콜백에서 매번 따로 처리해주던 에러도 마지막에 한번에 처리 가능
// 단, 메서드가 프로미스 방식을 지원해야 한다.
function findAndSaveUser(Users) {
    Users.findOne({})       // findOne(), save() 가 내부적으로 프로미스 객체를 가지고 있어야 함 (=new Promise 가 내부에 구현되어 있어야 함)
        .then((user) => {
            user.name = 'zero';
            return user.save();
        })
        .then((user) => {
            return Users.findOne({ gender: 'm' });
        })
        .then((user) => {
            // 생략
        })
        .catch(err => {
            console.error(err);
        });
}
