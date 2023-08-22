const channel = new BroadcastChannel("sw-messages");

self.onsystemmessage = (evt) => {
  try {
    let m = evt.data.json();
    self.registration.showNotification("Greg", {
      body: m.data.note,
    });
  } catch (e) {}

  try {
    const serviceHandler = () => {
      if (evt.name === "activity") {
        handler = evt.data.webActivityRequestHandler();
        const { name: activityName, data: activityData } = handler.source;
        if (activityName == "greg-oauth") {
          let code = activityData.code;

          const url = "/oauth.html?code=" + code;
          channel.postMessage({
            oauth_success: url,
          });
        }
      }
    };
    evt.waitUntil(serviceHandler());
  } catch (e) {}
};
