const fs = require('fs');

console.log('START');

let data = fs.readFileSync('./readme.txt');
console.log('1 번: ', data.toString());

data = fs.readFileSync('./readme.txt');
console.log('2 번: ', data.toString());

data = fs.readFileSync('./readme.txt');
console.log('3 번: ', data.toString());

console.log('END');
