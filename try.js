var handler = require('./dist/index.js').handler;

var event = {
  "session": {
    "sessionId": "SessionId.fb4b98d2-449c-43cf-b9a9-3d0dfd768c9d",
    "application": {
      "applicationId": "amzn1.echo-sdk-ams.app.ef7d53b5-c8cd-4177-a707-8b65a85a0028"
    },
    "attributes": {},
    "user": {
      "userId": "amzn1.ask.account.AFP3ZWPOS2BGJR7OWJZ3DHPKMOMNWY4AY66FUR7ILBWANIHQN73QHY7YRUQCC3EJGHNWHPJY6SMKQ3CGU44NLP3BYUM6II4Y4CWHW6RF3SUK7NJHIN3WZGI4YRLJJ3H6RENYOILA3TOUFWPXOOQPWVVYU5V7YTOEZ35Y65B47HPX3W5JHT7MHNISDP55CUZBCLL3QJPTGOL6YVQ"
    },
    "new": true
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "EdwRequestId.76f9972c-3dd5-4a5e-93aa-73b61dcc907a",
    "locale": "en-US",
    "timestamp": "2017-04-30T23:20:05Z",
    "intent": {
      "name": "GetTimesNumber",
      "slots": {
        "route": {
          "name": "route"
        },
        "stop": {
          "name": "stop"
        },
        "agency": {
          "name": "agency",
          "value": "941 ttc"
        },
        "direction": {
          "name": "direction"
        }
      }
    }
  },
  "version": "1.0"
}

var fakeLambdaContext = {
  succeed: function succeed(results) {
    console.log(results);
    process.exit(0);
  }
};

handler(event, fakeLambdaContext);
