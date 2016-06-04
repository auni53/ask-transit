var chai = require('chai');
var things = require('chai-things');
var chaiAsPromised = require('chai-as-promised');

chai.should();
chai.use(things);
chai.use(chaiAsPromised);

global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;
global.print = v => { 
  console.log(v);
  return true;
};

// require('./hello');
// require('./requestsTest');
// require('./ttcTest');
// require('./ClientTest');
