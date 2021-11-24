const os = require('os');

console.log('운영체제 정보---------');
console.log('os.arch():', os.arch()); // process.arch 와 동일
console.log('os.platform():', os.platform()); // process.platform 과 동일
console.log('os.type():', os.type()); // 운영체제의 종류
console.log('os.uptime():', os.uptime()); // 운영체제 부팅 이후 흐른 시간 (seconds)
console.log('os.hostname():', os.hostname()); // 컴퓨터의 이름
console.log('os.release():', os.release()); // 운영체제의 버전

console.log('경로------------');
console.log('os.homedir():', os.homedir());
console.log('os.tmpdir():', os.tmpdir());

console.log('cpu 정보-------------');
console.log('os.cpus():', os.cpus()); // 컴퓨터의 코어 정보
console.log('os.cpus().length:', os.cpus().length); // 코어 갯수

console.log('메모리 정보-----------');
console.log('os.freemem():', os.freemem()); // 사용가능한 메모리(RAM)
console.log('os.totalmem():', os.totalmem()); // 전체 메모리 용량

/*
운영체제 정보---------
os.arch(): x64
os.platform(): darwin
os.type(): Darwin
os.uptime(): 1229797
os.hostname(): -MacBookPro.local
os.release(): 20.6.0
경로------------
  os.homedir(): /Users/
os.tmpdir(): /var/folders/52/152mnlz94mq4pv238l5q91gm0000gn/T
cpu 정보-------------
  os.cpus(): [
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 40473350, nice: 0, sys: 29556590, idle: 312429490, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 2035780, nice: 0, sys: 1517170, idle: 377597410, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 40172510, nice: 0, sys: 19048140, idle: 321936510, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 1972660, nice: 0, sys: 1216270, idle: 377961090, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 25547300, nice: 0, sys: 13897010, idle: 341712290, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 2088680, nice: 0, sys: 1134590, idle: 377926250, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 21786840, nice: 0, sys: 11417770, idle: 347951410, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 2188490, nice: 0, sys: 1052490, idle: 377908040, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 18438910, nice: 0, sys: 9046630, idle: 353669900, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 2282100, nice: 0, sys: 959040, idle: 377907390, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 15867070, nice: 0, sys: 7087270, idle: 358200520, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 2364070, nice: 0, sys: 881780, idle: 377902180, irq: 0 }
  }
]
os.cpus().length: 12
메모리 정보-----------
  os.freemem(): 1336008704
os.totalmem(): 17179869184
*/
