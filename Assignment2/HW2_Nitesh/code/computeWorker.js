self.onmessage = function(e) {
  const { startNumber, endNumber } = e.data;
  let result = 0;
  for (let i = startNumber; i <= endNumber; i++) {
    result += i;
  }
  if (isNaN(result)) {
    postMessage("Please write two numbers");
  } else {
    const workerResult = { startNumber, endNumber, result };
    postMessage(workerResult);
  }
};
