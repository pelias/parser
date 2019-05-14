const Classification = require('./FinalTokenSingleCharacterClassification')

module.exports.tests = {}

module.exports.tests.constructor = (test) => {
  test('constructor', (t) => {
    let c = new Classification()
    t.false(c.public)
    t.equals(c.label, 'final_token_single_character')
    t.equals(c.confidence, 1.0)
    t.deepEqual(c.meta, {})
    t.end()
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`FinalTokenSingleCharacterClassification: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
