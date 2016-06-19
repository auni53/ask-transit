import index from 'services/index';
import { promisifyAll } from 'bluebird';
import includes from 'lodash/includes';
import flatten from 'lodash/flatten';

export default class Client {
  constructor(agency) {
    this._agency = agency;
    const service = this.findServices(this._agency);
    this._service = promisifyAll(require(`services/${service}`));
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
    const resolve = (token, label) => {
      let streets = token.split(' ').filter(w => w != 'and');
      const intersection = require('lodash/intersection');

      return (intersection(streets, label.split(' ')).length > 1);
    };

    const data = require(`../data/${this._agency}.json`);
    const stops = Object.keys(data.stops);
    const filteredStops = stops.filter(num =>
      token === num || resolve(token, data.stops[num])
    );
    if (filteredStops.length === 0) {
      const message = `could not find stops called ${token}.`;
      return Promise.reject(new Error(message));
    }
    return Promise.resolve(filteredStops);
  }

  save(n) {
    const cleanData = routes => {
      let data = {
        routes: {},
        stops: Object.assign({},
                ...routes.map(({ stops }) => stops)),
      };
      routes.forEach(({ route, directions }) =>
                     data.routes[route] = directions);
      return data;
    };

    return this.findRoutes().then(routes =>
      Promise.all(routes.slice(0, (n !== undefined ? n : routes.length))
        .map(route => this.findRouteConfig(route))
      ).then(cleanData)
    );
  }

  /**
   * Get list of routes.
   *
   * @return {[string]} array of routes
   */
  findRoutes() {
    return this._service.getRoutes(this._agency);
  }

  findRouteConfig(route) {
    return this._service.getStops(this._agency, route);
  }

  /**
   * Resolve the list of stops into a
   * list of valid predictions.
   *
   */
  findTimes(stopToken, route, direction) {
    const flatten = require('lodash/flatten');

    return this.findStops(stopToken)
      .then(stops => Promise.all(
        stops.map(stop =>
          this._service.getTimes(this.agency,
            {
              stop,
              routeNum: route,
              direction,
            }
          )
        )
      ).then(predictions => flatten(predictions)));

  }

  // Getters
  get agency() { return this._agency; }
}
