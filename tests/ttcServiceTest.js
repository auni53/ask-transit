import { getRoutes, getStops, getTimes } from '../src/services/nextbus.js';
import sample from './sample/ttc.json';

describe('TTC – nextbus service', () => {
  const agency = 'ttc';
  let route = '94';
  let direction = 'E'; 
  let stop, response, routeNum;

  it('gets a list of routes', function() {
    return getRoutes(agency)
            .should.be.fulfilled.and
            .should.eventually.include.members(sample.routes).and
            .should.eventually.have.lengthOf(sample.routes.length)
          ;
  });

  it('gets stops for route 94', function() {
    return getStops(agency, route)
            .should.be.fulfilled.and
           .should.eventually.deep.equal(sample['94'])
          ;
  });

  it('fails to get stops for route 1000', function() {
    return getStops(agency, '1000')
            .should.rejectedWith("1000 is not a ttc route.")
          ;
  });

  it('gets times at #15298 (Ossington Station)', function() {
    route = '94';      
    stop = '15298';
    return getTimes(agency, { stop })
            .should.be.fulfilled.and
            .should.eventually.be.a('array').and
            .should.eventually.have.lengthOf(2).and
            .should.eventually.have.property('0')
              .that.is.a('object').and
              .that.contains.keys('route', 'label', 'times')
          ;
            
  });

  it('gets times for 94E at #15298 (Ossington Station)', function() {
    stop = '15298';
    routeNum = route;
    direction = 'east';
    return Promise.all([
      getTimes(agency, { stop, routeNum, direction })
          .should.be.fulfilled.and
          .should.eventually.be.a('array').and
          .should.eventually.have.lengthOf(1),
      getTimes(agency, { stop, routeNum, direction })
          .should.eventually.have.deep.property('0.route', '94'),
      getTimes(agency, { stop, routeNum, direction })
          .should.eventually.have.deep.property('0.label',
            'east - 94 wellesley towards castle frank station'),
      getTimes(agency, { stop, routeNum, direction })
          .should.eventually.have.deep.property('0.times')
            .that.is.a('array'),
    ]);
  });

  it('fails to get times for 95 at #15298 (Ossington Station)', function() {
    stop = '15298';
    routeNum = '95';
    return getTimes(agency, { stop, routeNum })
            .should.be.rejectedWith("route 95 does not go to stop 15298.")
          ;
  });

  it('fails to get times for 94W at #15298 (Ossington Station)', function() {
    stop = '15298';
    routeNum = '94';
    direction = 'west';
    return getTimes(agency, { stop, routeNum, direction })
            .should.be.rejectedWith("route 94 west does not go to stop 15298.")
          ;
  });

  it('fails to get times for stop #51235121', function() {
    stop = '51235121';
    return getTimes(agency, { stop })
            .should.be.rejectedWith("51235121 is not a ttc stop.")
          ;
  });

  /*
  it('gets times for Harbord and Bathurst for 94', function() {
    throw AssertionError;
    /* links:
     * http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=ttc&stopId=7803
     * http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=ttc&stopId=7802
     *
     * [
     *   {
     *     'route': '94',
     *     'label': 'East - 94 Wellesley towards Castle Frank Station',
     *     'times': [179, 642, 1056, 1567, 2167],
     *   }, 
     *   {
     *     'route': '94',
     *     'label': 'West - 94a Wellesley towards Ossington Station',
     *     'times': [384, 869, 1429, 2122, 2629],
     *   }, 
     * ]
     *
  });

  it('gets times for Harbord and Bathurst for all', function() {
    throw AssertionError;
    /* links:
     * http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=ttc&stopId=7803
     * http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=ttc&stopId=7802
     * http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=ttc&stopId=0167
     * http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=ttc&stopId=0149
     *
     * [
     *   {
     *     'route': '94',
     *     'label': 'East - 94 Wellesley towards Castle Frank Station',
     *     'times': [179, 642, 1056, 1567, 2167],
     *   }, 
     *   {
     *     'route': '94',
     *     'label': 'West - 94a Wellesley towards Ossington Station',
     *     'times': [384, 869, 1429, 2122, 2629],
     *   }, 
     *   {
     *     'route': '511', 
     *     'label': 'North - 511 Bathurst towards Bathurst Station',
     *     'times':  [27, 250, 714, 1380, 1740],
     *   }, 
     *   {
     *     'route': '511',
     *     'label': 'South - 511 Bathurst towards Fleet Loop',
     *     'times': [903, 1018, 1263, 1983, 2343],
     *   }, 
     *   {
     *     'route': '310',
     *     'label': 'South - 310 Bathurst Blue Night towards Exhibition',
     *     'times': [],
     *   }, 
     *   {
     *     'route': '310',
     *     'label': 'North - 310 Bathurst Blue Night towards Steele',
     *     'times': [],
     *   }, 
     * ]
     *
  });
  */

});
