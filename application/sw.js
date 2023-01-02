const channel = new BroadcastChannel("sw-messages");
//channel.postMessage({ title: "Hello from SW" });

self.addEventListener("install", (event) => {
  channel.postMessage("install");
});

self.addEventListener("activate", (event) => {
  // bc.postMessage("activate");
});

self.addEventListener("fetch", function (event) {
  // bc.postMessage("yeah fetch fetch");
});

self.onsystemmessage = (evt) => {
  try {
    let m = evt.data.json();
    self.registration.showNotification("Greg", {
      body: m.data.note,
      vibrate: [200, 100, 200, 100, 200, 100, 200],
    });
  } catch (e) {}

  try {
    const serviceHandler = () => {

      if (evt.name === "activity") {
        handler = evt.data.webActivityRequestHandler();
        const { name: activityName, data: activityData } = handler.source;
        if (activityName == "greg-oauth") {
          channel.postMessage({ title: "yeah"+activityData });
/*
          clients.openWindow("/index.html");
          const { code } = activityData;
          const url = `/index.html?code=${code}`;
          clients.openWindow(url);
          */
        }
      }
    };
    evt.waitUntil(serviceHandler());
  } catch (e) {}
};
