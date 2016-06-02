import './services/nextbus';

export default class Client {
  
  constructor() {
    this._service = null;
  }
  
  load(agency) {
    const service = getService(agency);
    this._agency = agency;
    this._service = require(`./services/${service}`);
  }

  getService(agency) {
    const index = {
      'nextbus': ['ttc'],
    };

  }

  getRoutes() {
    return this._service.getRoutes(this._agency);
  }

  getStops(...args) {
    return this._service.getStops(this._agency, ...args);
  }

  getTimes(...args) {
    return this._service.getTimes(this._agency, ...args);
  }

  /*
    getServices() do some sick map filtering shit here
  */

  // Getters
  get agency() { return this._agency; }
}
