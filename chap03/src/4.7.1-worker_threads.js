const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  // 부모인 경우
  const worker = new Worker(__filename);
  worker.on('message', message => console.log('from worker', message));
  worker.on('exit', () => console.log('worker exit'));
  worker.postMessage('ping');
} else {
  // 워커인 경우
  parentPort.on('message', value => {
    console.log('from parent', value);
    parentPort.postMessage('pong');
    parentPort.close();
  });
}
