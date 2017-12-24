const notFoundController = require('../../controllers/pages/not-found');
const routes = require('../configuration').routes;

const configureForRouter = function(router) {
  router.get(routes.page.notFound, notFoundController.renderPage);
};

module.exports = {
  configureForRouter
};
