import 'babel-polyfill';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

import { get } from '../src/requests.js';

describe('request helpers', function(done) {
  
  it('should get from a URL', function() {
    const URL = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=ttc';
 
    get(URL).then(r => console.log(r)); 

    // expect(get(URL)).to.eventually.equal(5);
  });


});
