//const bc = new BroadcastChannel("channel");

self.addEventListener("install", (event) => {
  console.log("SW", "install", location.protocol, event);
});

self.addEventListener("activate", (event) => {
  console.log("SW", "activate", OFFLINE_VERSION, event);
});

self.addEventListener("fetch", function (event) {
  bc.postMessage("yeah fetch fetch");
});

self.onsystemmessage = (evt) => {
  console.log(" message data: " + evt.data);
  console.log("  data detail:");

  self.registration.showNotification("Alarm", {
    body: "Buzz! Buzz!",
    tag: "vibration-sample",
  });

  // bc.postMessage("notification");
};

/*
  self.registration.showNotification("Vibration Sample", {
    body: "Buzz! Buzz!",
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    tag: "vibration-sample",
  });

*/

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
