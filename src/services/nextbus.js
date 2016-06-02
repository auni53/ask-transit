import { get } from '../helpers/requests.js';
import stuff from '../../tests/sample/ttc';
import parse from '../helpers/xmlparse';

/** 
 * Get list of routes for an agency.
 * 
 * @param  {string}  agency
 * @return {promise} routes 
 */ 
export function getRoutes(agency) {
  const url = `http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=${agency}`;

  const query = 'body/route/@tag';

  return get(url)
    .then(r =>
      parse(r, query).map(e => e.value)
    );
}

/** 
 * Get list of stops for a route.
 * 
 * @param  {string}  agency 
 * @param  {string}  route 
 * @param  {string}  direction 
 * @return {promise} times 
 */ 
export function getStops(agency, route, direction) {
  const url = `http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=<a>&r=<r>`;
  return get(url);
}

/** 
 * Get next times for a stop, optional route/direction.
 * 
 * @param  {string}  agency 
 * @param  {stop, [route, [direction]]} info
 * @return {promise} times 
 */ 
export function getTimes(agency, { stop, route, direction }) {
  const url = `http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=${agency}&r=${stop}`;
  return get(url);
}
