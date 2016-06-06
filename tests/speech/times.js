import 'services/Client';
import sample from '../sample/ttc';
import { readTime } from 'lib/interpreter';

describe('Speech Generator', function() {

  describe('Converts times correctly', function() {
    it('no times', function() {
      readTime(15).should.eql('');
    });

    it('31 to 59 seconds', function() {
      readTime(30).should.eql('30 seconds');
      readTime(45).should.eql('30 seconds');
    });

    it('1-2 minutes', function() {
      readTime(60).should.eql('1 minute');
      readTime(89).should.eql('1 minute');
      readTime(90).should.eql('1 minute');
      readTime(91).should.eql('1 and a half minutes');
      readTime(119).should.eql('1 and a half minutes');
      readTime(120).should.eql('2 minutes');
      readTime(150).should.eql('2 minutes');
      readTime(160).should.eql('2 and a half minutes');
      readTime(179).should.eql('2 and a half minutes');
    });

    it('3 to 9 minutes', function() {
      readTime(180).should.eql('3 minutes');
      readTime(190).should.eql('3 minutes');
      readTime(210).should.eql('3 minutes');
      readTime(215).should.eql('less than 4 minutes');
      readTime(237).should.eql('less than 4 minutes');
    });

    it('10 to 15', function() {
      readTime(612).should.eql('10 minutes');
      readTime(642).should.eql('11 minutes');
    });

  });
});
