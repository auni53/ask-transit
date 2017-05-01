var path = require('path');

var APP_DIR = path.resolve(__dirname, 'src/');
var BUILD_DIR = path.resolve(__dirname, 'dist/');
var ARTIFACTS_DIR = path.resolve(__dirname, 'bin/');

var APP_ROOT = 'Transit.js';

module.exports = {
  entry: APP_DIR + '/' + APP_ROOT,
  target: 'node',
  output: {
    libraryTarget: 'commonjs',
    library: 'handler',
    filename: 'index.js',
    path: BUILD_DIR
  },
  module: {
    loaders: [
      { test: /\.js?/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.json$/, loader: 'json' }
    ]
  },
  resolve: {
    root: [
      APP_DIR,
      ARTIFACTS_DIR
    ],
    extensions: ['', '.js', '.json', '.yml']
  }
};
