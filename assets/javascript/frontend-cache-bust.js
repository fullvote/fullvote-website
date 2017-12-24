import preval from 'babel-plugin-preval/macro';
var supressCaching = preval`
    module.exports = require(__dirname + '/../../keys').supressCaching
`;
var frontendCacheBust = preval`
    var assetManifest = require(__dirname + '/../../asset-manifest');
    var frontendSignals = ['yardshoe-'];
    module.exports = Object.keys(assetManifest).reduce((obj, key) => {
        var filename = key.slice(key.lastIndexOf('/') + 1);
        if (frontendSignals.indexOf(filename.slice(0, filename.indexOf('-') + 1)) > -1) {
            obj[filename] = assetManifest[key].slice(assetManifest[key].lastIndexOf('/'));
        }
        return obj;
    }, {});
`;

module.exports = function(filename) {
  if (supressCaching) {
    return filename;
  }
  return frontendCacheBust[filename];
};
