var CACHE_NAME = preval`
    var crypto = require('crypto'); 
    var fs = require('fs'); 
    var contents = fs.readFileSync(__dirname + '/../../asset-manifest.json', 'utf8');
    module.exports = crypto.createHash('md5').update(contents).digest('hex').slice(0, 10); 
`;
var expectedCaches = [CACHE_NAME];

var staticRoutes = preval`
    var routes = require('../../routes/configuration').preRender.pages
        .filter(route => !route.mimeType || (route.mimeType === 'text/html'))
        .map(route => route.url);
    module.exports = routes;
`;

var urlsToCache = preval`
    // Problem: Old values being in manifest because this script is executed
    // before the manifest is generated (rev-ed).
    // Quickfix: Changed package.json to run assets:build then assets:expose
    // twice (via assets:buildAndExpose)
    // Todo: Code a real fix
    var manifest = require('../../asset-manifest.json');
    var getUrlFor = require('../../util/urlFor').getUrlFor;
    var supressCaching = require('../../keys').supressCaching
    var resources = [
        // Favicon
        '/assets/images/favicon-32x32.png',
        '/assets/images/favicon-16x16.png',

        // Offline page
        '/assets/offline.html',
    ];
    var array = Object.keys(manifest)
        .filter(key => key.indexOf('/assets/built/') === 0 || resources.indexOf(key) > -1)
        .map(key => getUrlFor(key));

    var other = supressCaching
        ? [
            '/assets/fonts/voticons.ttf?oofsiw',
            '/assets/fonts/voticons.woff?oofsiw',
            '/assets/fonts/voticons.svg?oofsiw#voticons'
        ]
        : [
            '/public/fonts/voticons.ttf?oofsiw',
            '/public/fonts/voticons.woff?oofsiw',
            '/public/fonts/voticons.svg?oofsiw#voticons'
        ];
    module.exports = [
        ...array,
        '/',
        ...other
    ];
`;

self.addEventListener('install', function(event) {
  self.skipWaiting();
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// remove caches that aren't in expectedCaches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (expectedCaches.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

var offlinePage = preval`
    var getUrlFor = require('../../util/urlFor').getUrlFor;
    module.exports = getUrlFor('/assets/offline.html');
`;

self.addEventListener('fetch', function(event) {
  event.respondWith(
    staticRoutes.indexOf(new URL(event.request.url).pathname) > -1
      ? fetch(event.request).catch(function() {
          return caches.match(event.request).then(function(response) {
            if (response) {
              return response;
            }
            if (event.request.mode === 'navigate') {
              return caches.match(offlinePage);
            }
          });
        })
      : caches.match(event.request).then(function(response) {
          return (
            response ||
            fetch(event.request).catch(function() {
              if (event.request.mode === 'navigate') {
                return caches.match(offlinePage);
              }
            })
          );
        })
  );
});
