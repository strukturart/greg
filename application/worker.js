let events = [];

// Receive data from the main thread
onmessage = function (event) {
  const mainThreadMessage = event;
  console.log("Received in worker:", mainThreadMessage);
  // Perform computations or tasks
  let result = { test: "hello" };

  // Send the result back to the main thread
  postMessage({ result });
};
