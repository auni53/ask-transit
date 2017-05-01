var module = require('../dist/index.js');

var fakeLambdaContext = {
  succeed: function succeed(results) {
    console.log(results);
    process.exit(0);
  }
};

module.hello({name: 'bob'}, fakeLambdaContext);
