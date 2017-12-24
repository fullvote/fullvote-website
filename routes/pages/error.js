const errorController = require('../../controllers/pages/error');
const routes = require('../configuration').routes;

const configureForRouter = function(router) {
  router.get(routes.page.error, errorController.renderPage);
};

module.exports = {
  configureForRouter
};
