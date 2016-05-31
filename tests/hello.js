import assert from 'assert';
import 'babel-polyfill';

import hello from "../src/hello.js"

describe("hello lambda", () => {
  it("should greet the world by default", () => {
    assert.equal(hello(), "Hello World");
  });

});
