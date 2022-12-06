self.addEventListener("install", (event) => {
  console.log("SW", "install", location.protocol, event);
});

self.addEventListener("activate", (event) => {
  console.log("SW", "activate", OFFLINE_VERSION, event);
});

self.addEventListener("fetch", function (event) {
  // do nothing here, just log all the network requests
  console.log(event.request.url);
});

self.onsystemmessage = (evt) => {
  alert("Receive systemmessage event with name: " + evt.name);
  console.log(" message data: " + evt.data);
  console.log("  data detail:");
  try {
    console.log(evt.data.json());
  } catch (err) {
    console.log(err);
  }
};

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
