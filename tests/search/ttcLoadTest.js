import Client from 'services/Client';
import sample from '../sample/ttc';

describe('class Client', () => {

  describe('constructs and loads service information', () => {
    let ttcClient;
    before(function() {
      ttcClient = new Client('ttc');
      ttcClient.load();
    });

    it('constructs a new client', function() {
      return ttcClient.should.be.an.instanceof(Client);
    });

    it('gets the right service for TTC', function() {
      return ttcClient.findServices('ttc')
        .should.include('nextbus');
    });

    it('loads the correct list of routes', function() {
      return ttcClient.findRoutes().should.eventually
        .include.members(sample.routes).and
        .have.lengthOf(sample.routes.length)
      ;
    });

    it('loads correct stop data for 94', function() {
      return ttcClient.findRouteConfig('94').should.eventually
        .deep.equal(sample['94'])
      ;
    });

    it('caches data', function() {
      return ttcClient.save().should.eventually.satisfy(global.print);
    });

  });

});
