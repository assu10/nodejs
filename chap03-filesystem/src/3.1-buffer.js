const buffer = Buffer.from('버퍼로 바꿔보세요');
console.log('from(): ', buffer);
console.log('length: ', buffer.length);
console.log('toString(): ', buffer.toString());

const array = [Buffer.from('하나 '), Buffer.from('둘 '), Buffer.from('셋')];
const buffer2 = Buffer.concat(array);
console.log('concat(): ', buffer2.toString());

const buffer3 = Buffer.alloc(5);
console.log('alloc(): ', buffer3);
