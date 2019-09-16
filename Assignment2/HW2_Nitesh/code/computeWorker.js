self.onmessage = function(e) {
  const { startNumber, endNumber } = e.data;
  let result = 0;
  // loop through the number and add them
  for (let i = startNumber; i <= endNumber; i++) {
    result += i;
  }
  // check if the result was a Number
  if (isNaN(result)) {
    postMessage("Please write two numbers");
  } else {
    // create the JSON result to return
    const workerResult = { startNumber, endNumber, result };
    // post message back
    postMessage(workerResult);
  }
};
