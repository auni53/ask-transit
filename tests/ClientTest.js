import Client from '../src/Client.js';

describe('class Client', () => {

  let ttcClient;
  before(function() {
    ttcClient = new Client('ttc');
  });
 
  describe('constructs and loads', () => {
    it('constructs a new client', function() {
      return ttcClient.should.be.a('Client');
    });

    it('gets the right service for TTC', function() {
      return ttcClient.getService('ttc').should.eql('nextbus');
    });
  });

  describe('gets information', () => {  
    it('loads the correct list of routes', function() {
      return ttcClient.getRoutes().should.be.fulfilled;
    });

    it('loads stop data for a route', function() {
      return ttcClient.getStops('94', 'E').should.be.fulfilled;
    });
  });
});
