const CACHE = 'caremane-v1';
const ASSETS = [
  '/caremane-app/',
  '/caremane-app/index.html',
  '/caremane-app/questions.js',
  '/caremane-app/questions2.js',
  '/caremane-app/manifest.json',
  '/caremane-app/icon-192.png',
  '/caremane-app/icon-512.png'
];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request))); });
