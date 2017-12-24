const rp = require('request-promise-native');
const { logError } = require('./logging');
const { Left, Right } = require('./either');

var getRequestWrapperForMethod = function(method) {
  return function(uri, payload, opts) {
    var headers = {
      'User-Agent': 'fullvote'
    };
    var options = Object.assign(
      {
        uri: uri,
        method: method,
        headers: headers,
        resolveWithFullResponse: true
      },
      opts || {}
    );

    if (['POST', 'PUT', 'PATCH'].indexOf(method) > -1) {
      options.json = true;
      options.body = payload;
    }

    return rp(options)
      .then(function(response) {
        return Right(response);
      })
      .catch(function(err) {
        logError(err.error);
        return Left(err);
      });
  };
};

module.exports = {
  get: getRequestWrapperForMethod('GET'),
  post: getRequestWrapperForMethod('POST'),
  put: getRequestWrapperForMethod('PUT'),
  patch: getRequestWrapperForMethod('PATCH'),
  delete: getRequestWrapperForMethod('DELETE'),
  head: getRequestWrapperForMethod('HEAD')
};
