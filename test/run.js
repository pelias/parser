var tape = require('tape');
var common = {};

var tests = [
  require('./tokenization/Span.js'),
  require('./tokenization/split.js'),
  require('./tokenization/permutate.js'),
  require('./tokenization/tokenizer.js')
];

tests.map(function(t) {
  t.all(tape, common);
});
