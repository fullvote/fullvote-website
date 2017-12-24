const { logError } = require('../lib/logging');

const isXhr = req => req.xhr || req.headers.accept.indexOf('json') > -1;

const errorCallback = (req, res) => err => {
  if (isXhr(req)) {
    if (err.name === 'QueryResultError' || err === 'Permission Denied') {
      return res.status(404).json({ error: 'Resource not found' });
    }
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res
        .status(400)
        .json({ error: 'Please login to perform this action' });
    }
    logError(err);
    return res.status(400).json({ error: (err && err.message) || err });
  } else {
    if (err.name === 'QueryResultError' || err === 'Permission Denied') {
      return res.status(404).render('notFound.html');
    }
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.redirect('/login');
    }
    logError(err);
    return res.status(400).render('error.html');
  }
};

const lorCallback = (req, res) => lor =>
  lor.fold(errorCallback(req, res), bo => res.status(200).json(bo.toJSON()));

// Non-final (not attached to root level promise)
// todo: evaluate usage of this (not sure being used correctly)
// this is just .val() ?
const lorPromiseCallback = lor =>
  lor.fold(
    err => {
      throw err;
    }, // do i really want to just throw?
    resource => resource
  );

module.exports = {
  errorCallback,
  lorCallback,
  lorPromiseCallback
};
