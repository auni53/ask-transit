import assert from "assert";
import 'babel-polyfill';

import { lambdaPromisifier } from "../lib/lambda-promisifier.js"
import hello from "../src/index.js"

const promisifiedHello = lambdaPromisifier(hello);

describe("hello lambda", function() {
  it("should greet the world by default", function() {
    hello();
  });

});
