
self.addEventListener("install", (event) =>
  console.log("ServiceWorker installed")
);

self.addEventListener("activate", (event) => {
  // This will be called only once when the service worker is activated.
  console.log("service worker activate");
});
