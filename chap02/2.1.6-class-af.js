class Human {
    constructor(type = 'human') {
        this.type = type;
    }
    static isHuman(human) {     //  클래스 함수는 static 으로 전환
        return human instanceof Human;
    }
    breathe() {
        alert('h-a-a-a-m');
    }
}

class Zero extends Human {
    constructor(type, firstName, lastName) {
        super(type);
        this.firstName = firstName;
        this.lastName = lastName;
    }

    sayName() {
        super.breathe();
        alert(`${this.firstName} ${this.lastName}`);
    }
}

let newZero = new Zero('human', 'jh', 'lee');
Human.isHuman(newZero); // true

console.log(Human.isHuman(newZero));