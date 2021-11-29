const fs = require('fs');

setInterval(() => {
  fs.unlink('./ddd.js', err => {
    if (err) {
      console.error(err);
    }
  });
}, 1000);
