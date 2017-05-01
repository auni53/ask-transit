var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);
};

import Transit from './Transit';
module.exports = Transit;
