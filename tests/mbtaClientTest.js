import Client from '../src/Client.js';

const hasValidTimes = predictions =>
  predictions.filter(({ route, label, times }) =>
    Array.isArray(times)
  ).length > 0;

const hasOnlyValidTimes = predictions =>
  predictions.filter(({ route, label, times }) =>
    Array.isArray(times)
  ).length === predictions.length;

describe('class Client mbta', function() {

  let mbtaClient, stop, route, direction, labels;
  before(function() {
    mbtaClient = new Client();
    mbtaClient.load('mbta');
  });

  describe('gets predictions for Massachusetts and Newbury', function() {
    before(function() {
      labels = {
        '1': 'harvard',
        '701': 'central square (limited stops)',
      };
    });

    it('resolves stop #00093 correctly', function() {
      stop = '00093';
      mbtaClient.findStops(stop)
        .should.eventually
          .contain('00093').and
          .eventually.have.lengthOf(1);
    });

    it('gets times for stop #00093', function() {
      stop = '00093';
      return mbtaClient.findTimes(stop).should.eventually
              .be.a('array').and
              .have.lengthOf(2).and
              .all.have.keys('route', 'label', 'times').and
              .include.something.that.has.property('route', '1').and
              .include.something.that.has.property('label', labels['1']).and
              .include.something.that.has.property('route', '701').and
              .include.something.that.has.property('label', labels['701']).and
              .satisfy(hasValidTimes).and
              .not.satisfy(hasOnlyValidTimes).and
        ;
    }); 

    it('gets times for the 1 from #00093', function() {
      stop = '00093';
      route = '1';
      return mbtaClient.findTimes(stop, route).should.eventually
              .be.a('array').and
              .have.lengthOf(1).and
              .all.have.keys('route', 'label', 'times').and
              .include.something.that.has.property('route', '1').and
              .include.something.that.has.property('label', labels['1']).and
              .satisfy(hasValidTimes).and
        ;
    }); 

    it('gets times to harvard stop #00093', function() {
      stop = '00093';
      route = undefined;
      direction = 'harvard';
      return mbtaClient.findTimes(stop, route, direction).should.eventually
              .be.a('array').and
              .have.lengthOf(1).and
              .all.have.keys('route', 'label', 'times')
              .include.something.that.has.property('route', '1').and
              .include.something.that.has.property('label', labels['1']).and
        ;
    }); 

    it('fails to get times to dudley stop #00093', function() {
      stop = '00093';
      route = undefined;
      direction = 'dudley';
      return mbtaClient.findTimes(stop, route, direction)
              .should.be.rejectedWith('route dudley does not go to stop 00093.')
        ;
    }); 

    it('fails to get predictions for the 701', function() {
      stop = '00093';
      route = '701';
      return mbtaClient.findTimes(stop, route).should.eventually
              .be.a('array').and
              .have.lengthOf(1).and
              .all.have.keys('route', 'label', 'times')
              .include.something.that.has.property('route', '701').and
              .include.something.that.has.property('label', labels['701']).and
              .not.satisfy(hasValidTimes).and
        ;
    });

    it('fails to get predictions to central', function() {
      stop = '00093';
      route = undefined;
      direction = 'central';
      return mbtaClient.findTimes(stop, route, direction).should.eventually
              .be.a('array').and
              .have.lengthOf(1).and
              .all.have.keys('route', 'label', 'times')
              .include.something.that.has.property('route', '701').and
              .include.something.that.has.property('label', labels['701']).and
              .not.satisfy(hasValidTimes).and
        ;
    });

  });
});
