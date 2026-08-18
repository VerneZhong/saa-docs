(() => {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    const manifest = document.querySelector('link[rel="manifest"]');
    if (!manifest) return;
    const workerUrl = new URL("service-worker.js", manifest.href);
    navigator.serviceWorker.register(workerUrl, { scope: new URL("./", workerUrl).pathname });
  });
})();
