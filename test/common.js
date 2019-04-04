const Tokenizer = require('../tokenization/Tokenizer')

const assert = (test, parser, input, expected) => {
  let tokenizer = new Tokenizer(input)
  parser.classify(tokenizer)
  parser.solve(tokenizer)
  test(input, (t) => {
    t.deepEquals(tokenizer.solution.map(s => s.pair.map(c => {
      return {
        [c.classification.label]: c.span.body
        // offset: c.span.start
      }
    })), expected)
    t.end()
  })
}

module.exports.assert = assert
