import { get } from '../helpers/requests.js';
import parse from '../helpers/xmlparse';
import intersection from 'lodash/intersection';

const getValue = e => e.value;

/** 
 * Get list of routes for an agency.
 * 
 * @param  {string}  agency
 * @return {promise} routes 
 */ 
export function getRoutes(agency) {
  const url = `http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=${agency}`;
  const query = 'body/route/@tag';
  const getQuery = doc => parse(doc, query).map(getValue);

  return get(url)
          .then(getQuery)
        ;
}

/** 
 * Get list of stops for a route.
 * 
 * @param  {string}  agency 
 * @param  {string}  route 
 * @param  {string}  direction 
 * @return {promise} times 
 */ 
export function getStops(agency, route) {
  const url = `http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=${agency}&r=${route}`;
  const stopQuery = `body/route/stop/@stopId`;
  const dirQuery = `body/route/direction/@name`;
  return get(url).then(doc => {
      // Parse stop information for route
      const stops = {}, directions = {};
      const stopList = parse(doc, stopQuery).map(getValue);
      stopList.forEach(stop => {
        const labelQuery = `body/route/stop[@stopId="${stop}"]/@title`;
        stops[stop] = parse(doc, labelQuery)[0].value.toLowerCase();
      });

      // Parse direction information for routes
      const dirList = parse(doc, dirQuery).map(getValue);
      dirList.forEach(dir => {
        const tagQuery = `body/route/direction[@name="${dir}"]/stop/@tag`;
        const tags = parse(doc, tagQuery).map(getValue);
        dir = dir.toLowerCase();
        directions[dir] = tags.map(t => {
          t = t.replace(/\D/g, ''); // Remove non-numbers from tag
          let stopId = parse(doc, `body/route/stop[@tag="${t}"]/@stopId`)[0];
          return stopId.value;
        });
      }); 
      
      if ([...Object.keys(stops), ...Object.keys(directions)].length === 0) {
        return Promise.reject(Error(`${route} is not a ${agency} route.`));
      }
      return { stops, directions };
    });
}

/** 
 * Get next times for a stop, optional route/direction.
 * 
 * @param    {string}  agency 
 * {
 *    @param {string} stop
 *   [@param {string} route]
 *   [@param {string} direction]
 * }
 * @return   {promise} times 
 */ 
export function getTimes(agency, { stop, routeNum, direction }) {
  const url = `http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=${agency}&stopId=${stop}`;
  let times = [];

  return get(url).then(doc => {
    const routeList = parse(doc, `/body/predictions/@routeTag`).map(getValue);
  
    if (routeList.length === 0) {
      return Promise.reject(Error(`${stop} is not a ${agency} stop.`));
    }

    let times = routeList.map(route => {
      let label, times;
      const activeQuery = `/body/predictions[@routeTag="${route}"]/direction`;
      const inactiveQuery = `/body/predictions[@dirTitleBecauseNoPredictions and @routeTag=${route}]/@dirTitleBecauseNoPredictions`;

      try {
        let activeLabel = parse(doc, activeQuery + '/@title');
        if (activeLabel.length > 0) {
          label = activeLabel[0].value.toLowerCase();
          times = parse(doc, activeQuery + '/prediction/@seconds').map(getValue);
        } else {
          label = parse(doc, inactiveQuery)[0].value.toLowerCase();
          times = null;
        }
      } catch (e) {
        console.log('--ERROR--');
        console.log(e);
        console.log(route);
        console.log(label);
      }
      return ({ route, label, times });
    });

    const validRoutes = times.filter(({route, label}) =>
                             (!routeNum  || route === routeNum));
    const validDirections = times.filter(({route, label}) =>
                             (!direction || ~label.indexOf(direction)));
    const validTimes = intersection(validRoutes, validDirections);

    return (validTimes.length > 0)
            ? validTimes
            : Promise.reject(Error(
              `route ${(routeNum ? routeNum + ' ': '') +
                       (direction ? direction + ' ': '')
                      }does not go to stop ${stop}.`
                ));

  });
}
