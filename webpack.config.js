var path = require('path');

var APP_DIR = path.resolve(__dirname, 'src/');
var BUILD_DIR = path.resolve(__dirname, 'dist/');

module.exports = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'index.js'
  },
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js?/,
        exclude: /node_modules/,
        loader: 'babel',
        query: JSON.parse(
          require('fs').readFileSync(path.resolve(__dirname, '.babelrc'), 'utf8'))
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};
