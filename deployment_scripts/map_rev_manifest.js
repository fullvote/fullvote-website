var jsonfile = require('jsonfile');
var rimraf = require('rimraf');

var revFile = './rev-manifest.json';

jsonfile.readFile(revFile, function(err, json) {
  if (err) {
    console.log(err);
  }

  var assetManifest = {};
  var revCacheBustSignal = '-';

  assetManifest = Object.keys(json).reduce((obj, key) => {
    var filename = key.slice(key.lastIndexOf('/') + 1);
    if (['sw.js'].indexOf(filename) > -1) {
      return obj;
    }
    if (['manifest.json'].indexOf(filename) > -1) {
      obj[`/${filename}`] = `/${json[key].split('/').pop()}`;
    } else {
      obj[`/assets/${key}`] = `/public/${json[key]}`;
    }
    return obj;
  }, {});

  jsonfile.writeFile(
    './asset-manifest.json',
    assetManifest,
    { spaces: 2 },
    function(error) {
      if (error) {
        console.error(error);
      } else {
        rimraf(revFile, () => {});
      }
    }
  );
});
