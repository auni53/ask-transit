import assert from 'assert';
import 'babel-polyfill';

import Client from '../src/Client.js';

const ROUTES = ['5', '6', '7', '8', '9', '10', '11', '12', '14', '15', '16', '17', '20', '21', '22', '23', '24', '25', '26', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '94', '95', '96', '97', '98', '99', '100', '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '115', '116', '117', '118', '119', '120', '122', '123', '124', '125', '126', '127', '129', '130', '131', '132', '133', '134', '135', '141', '142', '143', '144', '145', '160', '161', '162', '165', '167', '168', '169', '171', '172', '185', '186', '188', '190', '191', '192', '195', '196', '198', '199', '224', '300', '301', '302', '304', '306', '310', '312', '315', '317', '320', '322', '324', '325', '329', '332', '334', '335', '336', '337', '339', '341', '343', '352', '353', '354', '363', '365', '384', '385', '395', '396', '501', '502', '503', '504', '505', '506', '509', '510', '511', '512'];

describe('class client', () => {

  let ttcClient;

  before(function() {
    ttcClient = new Client('ttc');
  });
 
  it('should initiate a new Transit Client', function() {
    assert.equal(ttcClient.agency, 'ttc');
  });

  it('should fail when given an invalid agent', function() {
    assert.throws(() => new Client('foobar'), Error, 'agency not found');
  });

  it('should load routes for the agency', function(done) {
    done();
    /*
    ttcClient.load().then(r => {
      console.log('DONE'); 

      const routeInfo = ttcClient.routes;
      console.log(ttcClient.routes);
      for (let route of ROUTES) { 
        assert.equal(routeInfo[route], null);
      };
      done();
    });
    */
  });

  it('should load stop data for each route', function() {
    
  });

});
