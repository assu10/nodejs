// 화살표 함수와 함께 `async/await` 를 사용

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

// 위 함수를 화살표 함수와 함께 사용
const findAndSaveUser = async (Users) => {
    try {
        let user = await Users.findOne({});
        user.name = 'zero';
        user = await user.save();
        user = await User.findOne({ gender: 'm' });
        // 생략
    } catch (error) {
        console.error(error);
    }
};