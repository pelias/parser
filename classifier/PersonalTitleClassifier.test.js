const PersonalTitleClassifier = require('./PersonalTitleClassifier')
const PersonalTitleClassification = require('../classification/PersonalTitleClassification')
const Span = require('../tokenization/Span')
const classifier = new PersonalTitleClassifier()

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

module.exports.tests.classify = (test) => {
  let valid = [
    'Général', 'General', 'gal',
    'Saint', 'st', 'cdt', 'l\'Amiral', 'Burgemeester'
  ]

  valid.forEach(token => {
    test(`classify: ${token}`, (t) => {
      let s = classify(token)
      t.deepEqual(s.classifications, {
        PersonalTitleClassification: new PersonalTitleClassification(1.0)
      })
      t.end()
    })
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`PersonalTitleClassifier: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
