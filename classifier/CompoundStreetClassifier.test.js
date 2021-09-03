const CompoundStreetClassifier = require('./CompoundStreetClassifier')
const StreetClassification = require('../classification/StreetClassification')
const Span = require('../tokenization/Span')
const classifier = new CompoundStreetClassifier()

module.exports.tests = {}

function classify (body) {
  let s = new Span(body)
  classifier.each(s, null, 1)
  return s
}

module.exports.tests.contains_numerals = (test) => {
  test('contains numerals: honours contains.numerals boolean', (t) => {
    let s = new Span('example')
    s.contains.numerals = true
    classifier.each(s, null, 1)
    t.deepEqual(s.classifications, {})
    t.end()
  })
}

module.exports.tests.german_compound = (test) => {
  let valid = [
    'teststraße', 'teststrasse', 'teststr.',
    'teststr', 'grolmanstr',
    'testallee',
    'testweg',
    'testplatz',
    'testpl.',
    'testvägen'
  ]

  let invalid = [
    'testal',
    'testw', 'testw.'
  ]

  valid.forEach(token => {
    test(`german compound: ${token}`, (t) => {
      let s = classify(token)
      t.deepEqual(s.classifications, {
        StreetClassification: new StreetClassification(token.length > 1 ? 1.0 : 0.2)
      })
      t.end()
    })
  })

  invalid.forEach(token => {
    test(`german compound: ${token}`, (t) => {
      let s = classify(token)
      t.deepEqual(s.classifications, {})
      t.end()
    })
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`CompoundStreetClassifier: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
