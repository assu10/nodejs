const fs = require('fs').promises;

setInterval(() => {
  fs.unlink('./ddd.js');
}, 1000);
