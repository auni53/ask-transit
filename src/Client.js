import { get } from './requests';

class Client {
  constructor() {
  }

  load(agency) {
    if (AGENCIES.filter(a => a === agency).length > 0) {
      this._agency = agency;
      this._routes;
      return (this._agency);
    } else throw new Error('agency not found');
    const URL = `http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=${this._agency}`;

  }

  // Getters
  get agency() { return this._agency; }
  get routes() { return Object.keys(this._routes); }
}

export default Client;


const AGENCIES = [
  'actransit', 'jhu-apl', 'art', 'atlanta-sc', 'brockton', 'camarillo', 'ccrta', 'chapel-hill', 'charles-river', 'charm-city', 'ccny', 'oxford-ms', 'collegetown', 'cyride', 'dc-circulator', 'dc-streetcar', 'da', 'dumbarton', 'ecu', 'emery', 'fairfax', 'foothill', 'ft-worth', 'georgia-college', 'glendale', 'south-coast', 'indianapolis-air', 'jtafla', 'lasell', 'lametro', 'lametro-rail', 'mbta', 'mit', 'sf-mission-bay', 'moorpark', 'bronx', 'brooklyn', 'staten-island', 'nova-se', 'omnitrans', 'pvpta', 'sria', 'portland-sc', 'pgc', 'reno', 'radford', 'howard', 'roosevelt', 'rutgers-newark', 'rutgers', 'sf-muni', 'seattle-sc', 'simi-valley', 'stl', 'sct', 'thousand-oaks', 'thunderbay', 'ttc', 'unitrans', 'ucsf', 'umd', 'umn-twin', 'vista', 'wku', 'winston-salem', 'york-pa'];

