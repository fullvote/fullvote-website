const WebpackShellPlugin = require('./util/webpack-shell-plugin');
const config = require('./webpack.config');

config.plugins = [
  new WebpackShellPlugin({
    onBuildStart: ['rm -rf public'],
    onBuildEnd: ['npm run assets:expose && npm run js:build-sw']
  })
];

module.exports = config;
