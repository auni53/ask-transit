import hello from '../src/hello.js'

describe('Hello world', () => {
  it('should greet the world by default', () => {
    assert.equal(hello(), 'Hello World');
  });

});
