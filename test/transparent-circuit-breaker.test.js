var circuit = require('..')
  , should = require('should');

describe("a circuit breaker", function() {

  describe("when execution history is well-behaved", function() {

    describe("and the original method results in success", function() {
      var method = function method() { return 42; };
      var breaker = circuit.breaker(method);

      it("should execute the normal path", function() {
        breaker.path.should.equal("normal");
      });

      it("should return the same result as the original method", function() {
        var methodResult = method();
        var breakerResult = breaker();
        breakerResult.should.equal(methodResult);
      });

    });

    describe("and the original method results in an error", function() {

      var method = function method() { throw new Error(); };
      var breaker = circuit.breaker(method);
      try {
        breaker();
      } catch(ex) { }

      it("should increase the error count", function() {
        breaker.failure_count.should.equal(1);
      });

      it("should still plan to execute the normal path", function() {
        breaker.path.should.equal("normal");
      });

    });

  });

});
