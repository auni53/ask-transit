import { get } from '../src/helpers/requests.js';

describe('function get() from requests', function() {

  const url = {
    valid:   'http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=ttc',
    broken:  'http://webservices.nextbus.com/service/',
    invalid: 'http://nextbub.com/',
  };
  
  it('returns a promise', function() {
    return get(url.valid).should.be.a('promise');
  });

  it('returns fulfilled promise for a valid URL', function() { 
    return get(url.valid).should.be.fulfilled;
  });

  it('returns a string for a valid URL', function() { 
    return get(url.valid).should.eventually.be.a('String');
  });

  it('returns a 404 error with a broken page', function() { 
    return get(url.broken).should.be.rejectedWith('404 error.');
  });

  it('should fail the request for an invalid URL', function() { 
    return get(url.invalid).should.be.rejected;
  });

});
