const winston = require('winston');
const keys = require('../keys');
const { ravenClient } = require('./raven');
const { shouldProcessError } = require('./should-process-error');

const _logError = function(err) {
  if (!keys.supressSentry) {
    ravenClient.captureException(err);
    winston.error(err);
  } else {
    console.log(err); // eslint-disable-line no-console
  }
};

const logError = function(err) {
  let processError = true;
  try {
    processError = shouldProcessError(err);
  } catch (err2) {
    _logError(err2);
  }
  if (processError) {
    _logError(err);
  }
};

module.exports = {
  logError
};
