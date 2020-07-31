const MiddleInitialClassifier = require('./MiddleInitialClassifier')
const MiddleInitialClassification = require('../classification/MiddleInitialClassification')
const Span = require('../tokenization/Span')
const classifier = new MiddleInitialClassifier()

module.exports.tests = {}

function classify (body) {
  let s = new Span(body)
  classifier.each(s, null, 1)
  return s
}

module.exports.tests.classify = (test) => {
  const valid = [
    'M.',
    'M'
  ]

  valid.forEach(token => {
    test(`classify: ${token}`, (t) => {
      let s = classify(token)
      t.deepEqual(s.classifications, {
        MiddleInitialClassification: new MiddleInitialClassification(1.0)
      })
      t.end()
    })
  })

  const invalid = [
    'Mae',
    '122',
    'M,',
    '&',
    'Mr',
    'Esq'
  ]

  invalid.forEach(token => {
    test(`classify: ${token}`, (t) => {
      let s = classify(token)
      t.deepEqual(s.classifications, {})
      t.end()
    })
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`MiddleInitialClassifier: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
