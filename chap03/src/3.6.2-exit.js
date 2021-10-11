let i = 1;
setInterval(() => {
  if (i === 5) {
    console.log('stop');
    process.exit(0);
  }
  console.log(i);
  i += 1;
}, 1000);

/*
1
2
3
4
stop
*/
