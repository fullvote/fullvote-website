const homeRoutes = require('./home');
const errorPageRoutes = require('./error');
const notFoundPageRoutes = require('./not-found');

const configureForRouter = function(router) {
  // Order matters due to route more/less generic
  homeRoutes.configureForRouter(router);
  errorPageRoutes.configureForRouter(router);
  notFoundPageRoutes.configureForRouter(router);
};

module.exports = {
  configureForRouter
};
