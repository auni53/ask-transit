import { getRoutes, getStops, getTimes } from '../src/services/nextbus.js';
import sample from './sample/ttc.json';

describe('TTC service', () => {
  const agency = 'ttc';
  const route = '94';
  const direction = 'E'; 
  let stop, response;

  it('gets all the routes', function() {
    return Promise.all([
      getRoutes(agency).should.be.fulfilled,
      getRoutes(agency).should.eventually.include.members(sample.routes),
    ]);
  });

  it('gets stops for the 94', function() {
    getStops(agency, route, direction).should.be.fulfilled;
  });

  it('gets times at Ossington Station #15298', function() {
    const stop = '15298';
    getTimes(agency, { stop }).should.be.fulfilled;
  });

  it('gets times for 94 at Harbord and Bathurst #7803', function() {
    const stop = '15298';
    getTimes(agency, { stop, route, direction }).should.be.fulfilled;
  });

});
