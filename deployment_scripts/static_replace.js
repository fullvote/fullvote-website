const replace = require('replace-in-file');
const assetManifest = require('../asset-manifest');

const from = Object.keys(assetManifest);
const to = Object.keys(assetManifest).map(key => assetManifest[key]);

const options = {
  // Glob(s)
  files: [
    'public/built/**/*.css',
    'public/*.xml'
  ],

  // Multiple replacements with different strings (replaced sequentially)
  from: from,
  to: to,

  // Specify if empty/invalid file paths are allowed (defaults to false)
  // If set to true these paths will fail silently and no error will be thrown.
  allowEmptyPaths: false,

  // Character encoding for reading/writing files (defaults to utf-8)
  encoding: 'utf8'
};

replace(options)
  .then(changedFiles => {
    console.log('Modified files:', changedFiles.join(', '));
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });
