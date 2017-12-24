const assetManifest = require('../asset-manifest.json');
const conf = require('../config');
const { logError } = require('../lib/logging');

const getUrlFor = function(text) {
  if (conf.supressCaching) {
    return text;
  }
  return assetManifest[text] || logError(`${text} not in manifest`) || text;
};

const _urlFor = function(text, render) {
  return getUrlFor(text);
};

// Mustache needs the function wrapped by a function
const urlFor = () => _urlFor;

module.exports = {
  urlFor,
  getUrlFor
};
