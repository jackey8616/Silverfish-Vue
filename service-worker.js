importScripts("/precache-manifest.227dad76744042c8399c22253d0a9516.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

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
  workbox.strategies.staleWhileRevalidate({
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

