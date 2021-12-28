function showNotification(title, param_text, param_silent) {
  var options = {
    body: param_text,
    silent: param_silent,
  };
  Notification.requestPermission(function (result) {
    if (result === "granted") {
      navigator.serviceWorker.ready.then(function (registration) {
        registration.showNotification(title, options);
      });
    }
  });
}

self.onsystemmessage = (message) => {
  showNotification("Greg", message.data.foo, false);
};
