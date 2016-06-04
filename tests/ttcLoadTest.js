import Client from '../src/Client.js';
import sample from './sample/ttc.json';

describe('class Client', () => {

  describe('constructs and loads service information', () => {
    let ttcClient;
    before(function() {
      ttcClient = new Client();
    });

    it('constructs a new client', function() {
      return ttcClient.should.be.an.instanceof(Client);
    });

    it('gets the right service for TTC', function() {
      return ttcClient.findServices('ttc')
        .should.include('nextbus');
    });

    before(function (done) {
      ttcClient.load('ttc')
        .then(done);
    });

    it('loads the correct list of routes', function() {
      ttcClient.getRoutes()
        .should.include.members(sample.routes).and
        .should.have.lengthOf(sample.routes.length)
      ;
    });

    it('loads correct stop data for 94', function() {
      return ttcClient.getStops('94')
        .should.deep.equal(sample['94'])
      ;
    });
  });
 
});
