const bc = new BroadcastChannel("channel");
//bc.postMessage("hello");
self.addEventListener("install", (event) => {
  console.log("SW", "install", location.protocol, event);
  bc.postMessage("install");
});

self.addEventListener("activate", (event) => {
  console.log("SW", "activate", event);
  bc.postMessage("activate");
});

self.addEventListener("fetch", function (event) {
  // bc.postMessage("yeah fetch fetch");
});
self.onsystemmessage = (evt) => {
  bc.postMessage(evt);
  console.log("message data: " + evt.data);

  self.registration.showNotification("Alarm", {
    body: "Buzz! Buzz!",
    tag: "vibration-sample",
  });
};

/*
  self.registration.showNotification("Vibration Sample", {
    body: "Buzz! Buzz!",
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    tag: "vibration-sample",
  });

*/
// bc.postMessage("notification");
/*

self.onsystemmessage = (evt) => {
  alert("receive systemmessage event on sw.js!");
  console.log(evt.data.json());

  const serviceHandler = () => {
    if (evt.name === "activity") {
      console.warn("About to handle activity.");
      handler = evt.data.webActivityRequestHandler();
      const { name: activityName, data: activityData } = handler.source;
      if (activityName === "kaiteCallback") {
        const { code } = activityData;
        const url = `/index.html?code=${code}`;
        clients.openWindow(url);
        //todo get token
      }
    }
  };
  evt.waitUntil(serviceHandler());
};
*/
