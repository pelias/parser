const StreetPrefixClassifier = require('./StreetPrefixClassifier')
const StreetPrefixClassification = require('../classification/StreetPrefixClassification')
const Span = require('../tokenization/Span')

module.exports.tests = {}

function classify (body) {
  let c = new StreetPrefixClassifier()
  let s = new Span(body)
  c.each(s, null, 1)
  return s
}

module.exports.tests.contains_numerals = (test) => {
  test('contains numerals: honours contains.numerals boolean', (t) => {
    let c = new StreetPrefixClassifier()
    let s = new Span('example')
    s.contains.numerals = true
    c.each(s, null, 1)
    t.deepEqual(s.classifications, {})
    t.end()
  })
}

module.exports.tests.single_character_tokens = (test) => {
  test('index: does contain single char tokens', (t) => {
    let c = new StreetPrefixClassifier()
    t.true(Object.keys(c.index).some(token => token.length < 2))
    t.end()
  })
}

module.exports.tests.french_prefix = (test) => {
  let valid = [
    'rue', 'allée', 'allee',
    'avenue', 'av', 'rt.',
    'boulevard', 'blvd', 'blvd.'
  ]

  valid.forEach(token => {
    test(`french prefix: ${token}`, (t) => {
      let s = classify(token)
      t.deepEqual(s.classifications, {
        StreetPrefixClassification: new StreetPrefixClassification(token.length > 1 ? 1.0 : 0.2)
      })
      t.end()
    })
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`StreetPrefixClassifier: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
