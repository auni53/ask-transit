require('babel-core/register');

const data = require('./ttc.json');

const stops = new Set(Object.keys(data.stops).map(e => data.stops[e]));

stops.forEach(e => console.log(e));
