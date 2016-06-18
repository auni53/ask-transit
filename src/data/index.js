require('babel-core/register');
var promisifyAll = require('bluebird').promisifyAll;
var Client = promisifyAll(require('services/Client').default);
var print = v => { console.log(JSON.stringify(v)); };
var client = new Client('mbta');

debugger;
client.save().then(print);
