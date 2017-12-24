const express = require('express');
const restRoutes = require('./rest');
const pageRoutes = require('./pages');

const configureForApp = function(app) {
  const router = express.Router();

  restRoutes.configureForRouter(router);
  pageRoutes.configureForRouter(router);

  app.use('/', router);
};

module.exports = {
  configureForApp
};
