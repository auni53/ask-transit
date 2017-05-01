'use strict';
require('babel-core/register');
const Search = require('fuse.js');

console.time('list');
const data = require('./ttc.json');
const options = {
  include: ['score', 'matches'],
  tokenize: true,
  threshold: 0.5,
  location: 0,
  keys: ['id','label']
};

let bad = ['st', 'at', 'ave', 'rd', '@'];
const clean = label => label
    .split(' ')
    .filter(t => !(bad.indexOf(t) >= 0))
    .join(' ')
;

const list = (Object.keys(data.stops)
//  .filter((e, i) => i < 15)
  .map(i => ({
    id: i,
    label: clean(data.stops[i]),
  }))
);

let cat = new Search(list, options);
console.timeEnd('list');
// console.log(cat.list);
const slice = require('lodash/slice');
const sortBy = require('lodash/sortBy');
const sort = r => r.score;

console.time('result');
let query = 'bloor bathurst';
query = query.split(' ');
let result = sortBy([
  ...cat.search([query[0], query[1]].join(' ')),
  ...cat.search([query[1], query[0]].join(' ')),
], sort);

console.log();
console.timeEnd('result');
console.log(`query: ${query.join(' ')}`);
console.log(slice(result, 0, 10));
