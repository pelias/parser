const GivenNameClassifier = require('./GivenNameClassifier')
const GivenNameClassification = require('../classification/GivenNameClassification')
const Span = require('../tokenization/Span')

module.exports.tests = {}

function classify (body) {
  let c = new GivenNameClassifier()
  let s = new Span(body)
  c.each(s, null, 1)
  return s
}

module.exports.tests.contains_numerals = (test) => {
  test('contains numerals: honours contains.numerals boolean', (t) => {
    let c = new GivenNameClassifier()
    let s = new Span('example')
    s.contains.numerals = true
    c.each(s, null, 1)
    t.deepEqual(s.classifications, {})
    t.end()
  })
}

module.exports.tests.classify = (test) => {
  let valid = [
    'Anderson Luís',
    'Peter'
  ]

  valid.forEach(token => {
    test(`classify: ${token}`, (t) => {
      let s = classify(token)
      t.deepEqual(s.classifications, {
        GivenNameClassification: new GivenNameClassification(1.0)
      })
      t.end()
    })
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`GivenNameClassifier: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
