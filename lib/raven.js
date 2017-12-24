var raven = require('raven');
var sentryDSN = require('../keys').sentry;
var ravenClient = new raven.Client(sentryDSN);
var ravenRequestHandler = raven.middleware.express.requestHandler(sentryDSN);
var ravenErrorHandler = raven.middleware.express.errorHandler(sentryDSN);
module.exports = {
  ravenClient,
  ravenRequestHandler,
  ravenErrorHandler
};
