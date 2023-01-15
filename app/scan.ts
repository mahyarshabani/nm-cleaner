process.parentPort.once('message', (e) => {
  const [port] = e.ports;
});
