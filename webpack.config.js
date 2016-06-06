var path = require('path');

var APP_DIR = path.resolve(__dirname, 'src/');
var BUILD_DIR = path.resolve(__dirname, 'dist/');

module.exports = {
  entry: APP_DIR + '/Transit.js',
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
      path.resolve(__dirname, 'src/')
    ],
    extensions: ['', '.js', '.json', '.yml']
  }
};
