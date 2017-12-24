const homeController = require('../../controllers/pages/home');
const routes = require('../configuration').routes;

const configureForRouter = function(router) {
  router.get(routes.page.home, homeController.renderPage);
};

module.exports = {
  configureForRouter
};
