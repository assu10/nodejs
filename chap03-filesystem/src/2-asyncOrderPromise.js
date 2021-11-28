const fs = require('fs').promises;

console.log('START');

fs.readFile('./readme.txt')
  .then(data => {
    console.log('1 번: ', data.toString());
    return fs.readFile('./readme.txt');
  })
  .then(data => {
    console.log('2 번: ', data.toString());
    return fs.readFile('./readme.txt');
  })
  .then(data => {
    console.log('3 번: ', data.toString());
    return fs.readFile('./readme.txt');
  })
  .catch(err => {
    console.error(err);
  });

console.log('END');
