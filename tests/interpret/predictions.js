import 'services/Client';
import sample from '../sample/ttc';
import interpret from 'lib/interpreter';

describe('Speech Generator', function() {

  describe.skip('interprets correct predictions', function() {
    const {
      single_one,
      single_two,
      single_three,
      single_four,
      two_valids,
      two_valids_two,
      two_valids_three,
      two_valids_four,
      two_some_valid,
      impossible
    } = sample.predictions;

    it('single with one time', function() {
      interpret(single_one).should.eql('the 94 east arrives in 2 and a half minutes.');
    });

    it('single with two times', function() {
      interpret(single_two).should.eql('the 94 east arrives in 2 and a half minutes, then 11 minutes.');
    });

    it('single with three times', function() {
      interpret(single_three).should.eql('the 94 east arrives in 2 and a half minutes, then 11 minutes, then 13 minutes.');
    });

    it('single with three times, ignoring one', function() {
      // Time cap is 15 because there are <=2 valid times.
      interpret(single_four).should.eql('the 94 east arrives in 2 and a half minutes, then 11 minutes.');
    });

    it('double with all predictions', function() {
      interpret(two_valids).should.eql('the 161 west arrives in less than 9 minutes, then 19 minutes. the 94 east arrives in 16 minutes.');
    });

    it('double with all predictions, and two times', function() {
      // Time cap is 10 because there are 2< valid times.
      interpret(two_valids_two).should.eql('the 94 east arrives in 1 minute, then 16 minutes. the 161 west arrives in less than 9 minutes.');
    });

    it('double with all predictions, and three times', function() {
      interpret(two_valids_three).should.eql('the 94 east arrives in 1 minute, then less than 9 minutes. the 161 west arrives in less than 9 minutes.');
    });

    it('double with all predictions, and four times', function() {
      interpret(two_valids_four).should.eql('the 94 east arrives in 1 minute, then less than 9 minutes. the 161 west arrives in 1 minute, then less than 9 minutes.');
    });

    it('double with some predictions', function() {
      interpret(two_some_valid).should.eql('the 511 south arrives in 1 minute, then less than 6 minutes, then 15 minutes.');
    });

    it('too many', function() {
      interpret(impossible).should.eql('I found times for the 94 east, the 94 west, the 511 north, and the 511 south. What route would you like times for?');
    });

  });
});

