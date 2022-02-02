self.addEventListener("notificationclick", (event) => {
  console.log(event.action);
  if (event.action === "dismiss") {
    return; // dismissed
  }

  if (event.action === "open") {
    console.log("open");
    clients.openApp({ msg: event.notification });
  }
});

self.addEventListener("install", (event) =>
  console.log("ServiceWorker installed")
);

self.addEventListener("activate", (event) => {
  // This will be called only once when the service worker is activated.
  console.log("service worker activate");
});
