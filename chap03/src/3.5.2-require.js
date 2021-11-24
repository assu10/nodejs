console.log('require 가 가장 위에 오지 않아도 됨');

module.exports = 'find me~';

require('./3.1.1-var');

console.log('require.cache..', require.cache);
console.log('require.main === module..', require.main === module);
console.log('require.main.filename..', require.main.filename);
