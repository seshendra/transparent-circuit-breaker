var transparent = require('transparent');

function Breaker() {
  
}

function breaker(method) {
  var result = transparent.proxy(method);
  result.path = "normal";
  result.failure_count = 0;

  return result;
}

exports.breaker = breaker;
