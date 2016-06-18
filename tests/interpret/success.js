import 'services/Client';
import sample from '../sample/ttc';
import interpret from 'lib/interpreter';

describe('Speech Generator', function() {

  describe('interprets correct predictions', function() {
    const {
      single,
      two_valids,
      two_some_valid,
      impossible
    } = sample.predictions;

    it('single with predictions', function() {
      interpret(single)
        .should.eql('the 94 east on wellesley towards castle frank station arrives two and a half minutes, then ten minutes');

    });

    it('double with all predictions', function() {
      interpret(two_valids)
        .should.eql('the 94 east on wellesley towards castle frank station arrives in sixteen minutes. the 161 west on rogers rd towards jane arrives in nine minutes');
    });

    it('double with some predictions', function() {
      interpret(two_some_valid)
        .should.eql('the 511 south on bathurst towards fleet loop arrives in one minute, then six minutes');
    });

  });
});
