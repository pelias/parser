const OrdinalClassifier = require('./OrdinalClassifier')
const OrdinalClassification = require('../classification/OrdinalClassification')
const Span = require('../tokenization/Span')
const classifier = new OrdinalClassifier()

module.exports.tests = {}

function classify (body) {
  let s = new Span(body)
  classifier.each(s)
  return s
}

module.exports.tests.contains_numerals = (test) => {
  test('contains numerals: honours contains.numerals boolean', (t) => {
    let s = new Span('100')
    s.contains.numerals = false
    classifier.each(s)
    t.deepEqual(s.classifications, {})
    t.end()
  })
}

module.exports.tests.english = (test) => {
  test('English: single digit', (t) => {
    let s = classify('1st')
    t.deepEqual(s.classifications, { OrdinalClassification: new OrdinalClassification(1.0) })
    t.end()
  })
  test('English: multiple digits', (t) => {
    let s = classify('250th')
    t.deepEqual(s.classifications, { OrdinalClassification: new OrdinalClassification(1.0) })
    t.end()
  })
}

module.exports.tests.english_incorrect = (test) => {
  test('English: single digit', (t) => {
    let s = classify('1rd')
    t.deepEqual(s.classifications, {})
    t.end()
  })
  test('English: multiple digits', (t) => {
    let s = classify('250nd')
    t.deepEqual(s.classifications, {})
    t.end()
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`OrdinalClassifier: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
