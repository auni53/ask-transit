import Client from 'services/Client';
import sample from '../sample/ttc';

describe('class Client', function() {

  describe('can query stops', function() {

    let ttcClient;
    before(function() {
      ttcClient = new Client('ttc');
    });

    it('caches data', function() {
      // return ttcClient.save().should.eventually.satisfy(global.print);
    });

    describe('resolves stops correctly', function() {

      it('loads stops info for ttc', function() {
        let token = '7803';
        return ttcClient.findStops(token).should.eventually
          .eql([token]);
      });

      it('loads stop list for harbord and bathurst', function() {
        let token = 'harbord and bathurst';
        let stops = ['7802', '7803', '0148', '0149'];
        return ttcClient.findStops(token).should.eventually
          .include.members(stops);
      });

      it('loads stop list for Ossington Station', function() {
        let token = 'ossington station';
        let stops = ['15298'];
        return ttcClient.findStops(token).should.eventually
          .include.members(stops);
      });

    });

    it('loads my street', function() {
      let token = 'massachusetts and trowbridge';
      let stops = ['00108'];
      let mbtaClient = new Client('mbta');
      return mbtaClient.findStops(token).should.eventually
        .include.members(stops);
    });

  });

});
