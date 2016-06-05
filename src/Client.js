import index from './services/index';

import includes from 'lodash/includes';
import flatten from 'lodash/flatten';

export default class Client {
  
  constructor() {
    this._service = null;
  }
  
  load(agency) {
    const service = this.findServices(agency);
    this._agency = agency;
    this._service = require(`./services/${service}`);
    let data = {};
    let count = 0;
    let routes = this._service.getRoutes(agency);
  }

  /**
   * Resolve the provided agency query into
   * a list of matching services.
   * (Uses data from sample/index.json)
   *
   * @param  {string}   agency
   * @return {[string]} services
   */
  findServices(agency) {
    return Object.keys(index).filter(service => 
                includes(index[service], agency));
  }

  /**
   * Resolve the provided stop query into a 
   * list of valid stops.
   *
   * @param  {string}   query 
   * @return {[number]} stops
   */
  findStops(token) {
    return Promise.resolve([token]);
  }
  
  /**
   * Resolve the list of stops into a
   * list of valid predictions.
   *
   */
  findTimes(stopToken, route, direction) {
      return this.findStops(stopToken)
        .then(stops => 
            this._service.getTimes(this.agency, 
                {
                  stop: stops[0],
                  routeNum: route,
                  direction,
                })
        );

      /*
     return Promise.all(stops.map(stop =>
        .catch(e => console.log('--ERROR--', [e]))
    ));
   */
  }

  /**
   *
   */

  // Getters
  get agency() { return this._agency; }
}
