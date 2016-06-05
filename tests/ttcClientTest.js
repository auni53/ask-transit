import Client from '../src/Client.js';
import sample from './sample/ttc.json';

const hasValidTimes = predictions =>
  predictions.filter(({ route, label, times }) =>
    Array.isArray(times)
  ).length > 0;

const hasOnlyValidTimes = predictions =>
  predictions.filter(({ route, label, times }) =>
    Array.isArray(times)
  ).length === predictions.length;

describe('class Client for TTC', function() {

  let ttcClient, stop, route, direction, labels;
  before(function() {
    ttcClient = new Client();
    ttcClient.load('ttc');
  });

  describe('gets predictions for Ossington Station', function() {
    before(function() {
      labels = {
        '161': 'west - 161 rogers rd towards jane',
        '94': 'east - 94 wellesley towards castle frank station',
      };
    });

    it('resolves stop #15298 correctly', function() {
      stop = '15298';
      ttcClient.findStops(stop)
        .should.eventually
          .contain('15298').and
          .eventually.have.lengthOf(1);
    });

    it('gets times for stop #15298', function() {
      stop = '15298';
      return ttcClient.findTimes(stop).should.eventually
              .be.a('array').and
              .have.lengthOf(2).and
              .all.have.keys('route', 'label', 'times').and
              .satisfy(hasOnlyValidTimes).and
              .include.something.that.has.property('route', '161').and
              .include.something.that.has.property('label', labels['161']).and
              .include.something.that.has.property('route', '94').and
              .include.something.that.has.property('label', labels['94'])
        ;
    }); 

    it('gets times for the 94 at stop #15298', function() {
      stop = '15298';
      route = '94';
      return ttcClient.findTimes(stop, route).should.eventually
              .be.a('array').and
              .have.lengthOf(1).and
              .all.have.keys('route', 'label', 'times').and
              .not.include.something.that.has.property('route', '161').and
              .not.include.something.that.has.property('label', labels['161']).and
              .include.something.that.has.property('route', '94').and
              .include.something.that.has.property('label', labels['94'])
        ;
    }); 

    it('gets times for the 94 east from stop #15298', function() {
      stop = '15298';
      route = '94';
      direction = 'east';
      return ttcClient.findTimes(stop, route, direction).should.eventually
              .be.a('array').and
              .have.lengthOf(1).and
              .all.have.keys('route', 'label', 'times')
              .not.include.something.that.has.property('route', '161').and
              .not.include.something.that.has.property('label', labels['161']).and
              .include.something.that.has.property('route', '94').and
              .include.something.that.has.property('label', labels['94'])
        ;
    }); 

    it('gets times west from stop #15298', function() {
      stop = '15298';
      route = undefined;
      direction = 'west';
      return ttcClient.findTimes(stop, route, direction).should.eventually
              .be.a('array').and
              .have.lengthOf(1).and
              .all.have.keys('route', 'label', 'times')
              .include.something.that.has.property('route', '161').and
              .include.something.that.has.property('label', labels['161']).and
              .not.include.something.that.has.property('route', '94').and
              .not.include.something.that.has.property('label', labels['94'])
        ;
    }); 

    it('fails to get times for 95 from stop #15298', function() {
      stop = '15298';
      route = '95';
      return ttcClient.findTimes(stop, route)
          .should.be.rejectedWith("route 95 does not go to stop 15298.")
        ;
    }); 

    it('fails to get times south from stop #15298', function() {
      stop = '15298';
      route = undefined;
      direction = 'south';
      return ttcClient.findTimes(stop, route, direction)
          .should.be.rejectedWith("route south does not go to stop 15298.")
        ;
    }); 

    it('fails to get times for 95 west from stop #15298', function() {
      stop = '15298';
      route = '95';
      direction = 'west';
      return ttcClient.findTimes(stop, route, direction)
          .should.be.rejectedWith("route 95 west does not go to stop 15298.")
        ;
    }); 
  });

  describe('gets predictions for Harbord and Bathurst NW corner', function() {
    before(function() {
      labels = {
        '511': 'south - 511 bathurst towards fleet loop',
        '310': 'south - 310 bathurst blue night towards exhibition',
      };
    });

    it('resolves stop #0149 correctly', function() {
      stop = '0149';
      ttcClient.findStops(stop)
        .should.eventually
          .contain('0149').and
          .have.lengthOf(1);
    });

    it('gets times for stop #0149', function() {
      stop = '0149';
      return ttcClient.findTimes(stop).should.eventually
              .be.a('array').and
              .have.lengthOf(2).and
              .all.have.keys('route', 'label', 'times').and
              .include.something.that.has.property('route', '511').and
              .include.something.that.has.property('label', labels['511']).and
              .include.something.that.has.property('route', '310').and
              .include.something.that.has.property('label', labels['310']).and
              .include.something.that.has.property('times', null).and
              .satisfy(hasValidTimes).and
              .not.satisfy(hasOnlyValidTimes).and
        ;
    }); 

    it('gets times for the 511 from stop #0149', function() {
      stop = '0149';
      route = '511';
      return ttcClient.findTimes(stop, route).should.eventually
              .be.a('array').and
              .have.lengthOf(1).and
              .all.have.keys('route', 'label', 'times').and
              .include.something.that.has.property('route', '511').and
              .include.something.that.has.property('label', labels['511']).and
              .satisfy(hasOnlyValidTimes).and
        ;
    }); 

    it('gets times for the 310 from stop #0149', function() {
      stop = '0149';
      route = '310';
      return ttcClient.findTimes(stop, route).should.eventually
              .be.a('array').and
              .have.lengthOf(1).and
              .all.have.keys('route', 'label', 'times')
              .include.something.that.has.property('route', '310').and
              .include.something.that.has.property('label', labels['310']).and
              .not.satisfy(hasValidTimes).and
        ;
    }); 

  });
});

