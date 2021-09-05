// async/await 기본 사용

function findAndSaveUser(Users) {
    Users.findOne({})           // findOne(), save() 가 내부적으로 프로미스 객체를 가지고 있어야 함 (=new Promise 가 내부에 구현되어 있어야 함)
        .then((user) => {
            user.name = 'zero';
            return user.save();
        })
        .then((user) => {
            return Users.findOne( { gender: 'm'});
        })
        .then((user) => {
            // 생략
        })
        .catch((error) => {
            console.error(error);
        })
}

// 프로미스로 구성되어 있는 위 코드를 async/await 문법을 사용하여 바꿔보자.
async function findAndSaveUser(Users) {
    try {
        let user = await Users.findOne({});
        user.name = 'zero';
        user = await user.save();
        user = await User.findOne( { gender: 'm' });
        // 생략
    } catch (error) {
        console.error(error);
    }
}