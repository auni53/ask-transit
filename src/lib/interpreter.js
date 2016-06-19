import { hasValidTimes } from 'lib/helpers';
import slice from 'lodash/slice';
import flatten from 'lodash/flatten';
import sortBy from 'lodash/sortby';

export default function interpret(data, label) {
  if (!label || label === 'prediction') {
    return predictions(data);
  }
}

export function predictions(predictionsData) {
  const data = predictionsData.filter(p => (p.times !== null));
  const print = s => { console.log(s); return true; };
  const validTimes = flatten(data.map(datum => slice(datum.times, 0, 3)));
  const nTimes = validTimes.filter(t => (t < (30 * 60))).length;
  let cap;
  console.log(validTimes);
  console.log(nTimes);
  if (nTimes > 8) {
    cap = 5;
  } else if (nTimes > 4) {
    cap = 5;
  } else cap = 7.5;
  console.log(cap);

  return sortBy(data, datum => datum.times[0]).map(
      ({ route, label, times }) =>
      `the ${route} ${readDirection(label)} arrives in ${readTime(times[0])}`
        + (times[1] < (cap * 4 * 60) ? `, then ${readTime(times[1])}` : '')
        + (times[2] < (cap * 2 * 60) ? `, then ${readTime(times[2])}` : '')
        + '.'
  ).join(' ');
}

export function readDirection(label) {
  const directions = ['east', 'west', 'north', 'south', 'inbound', 'outbound'];
  const filteredTokens = label.split(' ').filter(token => directions.indexOf(token) >= 0);
  return (filteredTokens.length === 1
          ? filteredTokens[0]
          : label);
}

export function readTime(time) {
  if (time < 30) {
    return '';
  } else if (time < 60) {
    return '30 seconds';
  }
  let minute = Math.floor(time / 60);
  let second = time % 60;

  if (second <= 30) {
    return `${minute} ${minute == 1 ? 'minute' : 'minutes'}`;
  } else if (minute <= 2) {
    return `${minute} and a half minutes`;
  } else if (minute <=9) {
    return `less than ${minute + 1} minutes`;
  } else {
    return `${minute + 1} minutes`;
  }
}
