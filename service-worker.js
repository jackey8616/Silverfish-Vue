importScripts("/precache-manifest.21be1883b1fdaa727814ff6a5b21da0b.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

workbox.setConfig({ debug: true });

workbox.clientsClaim();
workbox.skipWaiting();

workbox.routing.registerRoute(
  new RegExp('.*\.html'),
  workbox.strategies.networkFirst({
    cacheName: 'workbox:html'
  })
);

workbox.routing.registerRoute(
  /.*\.css/,
  workbox.strategies.networkFirst({
    cacheName: 'workbox:css',
  })
);

workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.networkFirst({
    cacheName: 'workbox:js'
  })
);

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

