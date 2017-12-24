const path = require('path');
const webpack = require('webpack');
// const ManifestPlugin = require('webpack-manifest-plugin');
const keys = './config';

module.exports = {
  entry: {
    home: './assets/javascript/home.js'
    // sw: './assets/javascript/sw.js' // doing manually with just babel cli
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['babel-macros']
          }
        }
      }
    ]
  },
  plugins: [
    // new ManifestPlugin({
    //   // fileName: '../../../views/asset-manifest.json.partial', // super hacky..
    //   fileName: '../../../asset-manifest.json', // hacky
    //   basePath: '/assets/built/'
    // }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),
    new webpack.DefinePlugin({
      'process.env.SUPRESS_CACHING': keys.supressCaching,
      'process.env.SUPRESS_SENTRY': keys.supressSentry,
      'process.env.SUPRESS_ANALYTICS': keys.supressAnalytics
    })
  ],
  // output: {
  //   path: path.join(__dirname, 'assets/built'),
  //   filename: '[name].[hash].js',
  //   sourceMapFilename: '[name].map'
  // }
  output: {
    path: path.join(__dirname, 'assets/built'),
    filename: '[name].js',
    sourceMapFilename: '[name].map'
  }
};
