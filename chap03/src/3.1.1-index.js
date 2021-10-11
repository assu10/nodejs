/*import { even, odd } from './3.1.1-var';
import checkNumber from './3.1.1-func';*/

const { odd, even } = require('./3.1.1-var');
const checkNumber = require('./3.1.1-func');

function checkStringOddOrEven(str) {
  if (str.length % 2) {
    return odd;
  }
  return even;
}

console.log(checkStringOddOrEven('hello'));
console.log(checkNumber(10));

//export default checkStringOddOrEven;
module.exports = checkStringOddOrEven;
