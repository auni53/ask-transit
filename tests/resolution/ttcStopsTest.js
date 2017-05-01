import Client from 'services/Client';
import sample from '../sample/ttc';

describe('class Client', function() {

  let ttcClient, mbtaClient, token, stops;
  before(function() {
    ttcClient = new Client('ttc');
    mbtaClient = new Client('mbta');
  });

  describe('can query stops', function() {

    it('caches data', function() {
      // return ttcClient.save().should.eventually.satisfy(global.print);
    });
  });

  describe('resolves stop numbers', function() {

    it('loads stops info for ttc 7803', function() {
      token = '7803';
      return ttcClient.findStops(token).should.eventually
        .eql([token]);
    });

    it('loads stops info for mbta 00108', function() {
      token = '00108';
      return mbtaClient.findStops(token).should.eventually
        .eql([token]);
    });
  });

  describe('resolves correctly spelled intersections', function() {

    it('loads stop list for harbord and bathurst', function() {
      token = 'harbord bathurst';
      stops = ['7802', '7803', '0148', '0149'];
      return ttcClient.findStops(token).should.eventually
        .include.members(stops);
    });

    it('loads stop list for Ossington Station', function() {
      token = 'ossington station';
      stops = ['15298', '14743', '14744'];
      return ttcClient.findStops(token).should.eventually
        .include.members(stops)
        .and.have.lengthOf(stops.length)
        ;
    });

    it('gets times for Ossington Station', function() {
      token = 'ossington station';
      stops = ['15298', '14743', '14744'];
      return ttcClient.findTimes(token, undefined, undefined)
          .should.eventually.include
          .something.that.has.keys('route', 'label', 'times')
        ;
    });

    it('gets stops for massachusetts and trowbridge', function() {
      token = 'massachusetts trowbridge';
      stops = ['00108'];
      return mbtaClient.findStops(token).should.eventually
        .include.members(stops)
        .and.have.lengthOf(stops.length)
        ;
    });

    it('gets stops for auburn and putnam', function() {
      token = 'auburn putnam';
      stops = ['00067'];
      return mbtaClient.findStops(token).should.eventually
        .include.members(stops)
        .and.have.lengthOf(stops.length)
        ;
    });

  });

  describe('resolves slight errors in intersections', function() {
    const queries = [
      [['7802', '7803', '0148', '0149'], 'ttc', 'harbord and bathurst'],
      [['7802', '7803', '0148', '0149'], 'ttc', 'har and bathurst'],
    ];

    queries.forEach(q =>
      it(`gets ${q[1]} stops at ${q[2]}`, function() {
        return (new Client(q[1]))
          .findStops(q[2]).should.eventually
          .include.members(q[0])
          .and.have.lengthOf(q[0].length)
          ;
      })
    );

  });

});
