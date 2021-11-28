const fs = require('fs').promises;

fs.readFile('./readme.txt')
  .then(data => {
    console.log('data: ', data);
    console.log('data.toString(): ', data.toString());
  })
  .catch(err => {
    console.error(err);
  });
