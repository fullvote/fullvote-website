if ('serviceWorker' in navigator) {
  var logger = console.debug || console.log;
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(
      function(registration) {
        logger.call(
          console,
          'ServiceWorker registration successful with scope: ' +
            registration.scope
        );
      },
      function(err) {
        logger.call(console, 'ServiceWorker registration failed: ', err);
      }
    );
  });
}
