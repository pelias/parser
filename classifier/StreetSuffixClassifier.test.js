const StreetClassifier = require('./StreetClassifier')
const StreetSuffixClassification = require('../classification/StreetSuffixClassification')
const StreetClassification = require('../classification/StreetClassification')
const Span = require('../tokenization/Span')

module.exports.tests = {}

function classify (body) {
  let c = new StreetClassifier()
  let s = new Span(body)
  c.each(s, null, 1)
  return s
}

module.exports.tests.contains_numerals = (test) => {
  test('contains numerals: honours contains.numerals boolean', (t) => {
    let c = new StreetClassifier()
    let s = new Span('example')
    s.contains.numerals = true
    c.each(s, null, 1)
    t.deepEqual(s.classifications, {})
    t.end()
  })
}

module.exports.tests.english_suffix = (test) => {
  let valid = [
    'street', 'st', 'st.',
    'road', 'rd', 'rd.',
    'boulevard', 'blvd', 'blvd.'
  ]

  valid.forEach(token => {
    test(`english suffix: ${token}`, (t) => {
      let s = classify(token)
      t.deepEqual(s.classifications, {
        StreetSuffixClassification: new StreetSuffixClassification(token.length > 1 ? 1.0 : 0.2)
      })
      t.end()
    })
  })
}

module.exports.tests.german_suffix = (test) => {
  let valid = [
    'straße', 'strasse', 'str', 'str.',
    'allee', 'al', 'al.',
    'weg', 'w', 'w.'
  ]

  valid.forEach(token => {
    test(`german suffix: ${token}`, (t) => {
      let s = classify(token)
      t.deepEqual(s.classifications, {
        StreetSuffixClassification: new StreetSuffixClassification(token.length > 1 ? 1.0 : 0.2)
      })
      t.end()
    })
  })
}

module.exports.tests.german_compound = (test) => {
  let valid = [
    'teststraße', 'teststrasse', 'teststr.',
    'testallee',
    'testweg', 'testw.',
    'testplatz', 'testpl.'
  ]

  let invalid = [
    'teststr',
    'testal',
    'testw'
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
    return tape(`StreetClassifier: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
