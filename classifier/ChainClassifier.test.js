const ChainClassifier = require('./ChainClassifier')
const ChainClassification = require('../classification/ChainClassification')
const Span = require('../tokenization/Span')

module.exports.tests = {}

function classify (body) {
  let c = new ChainClassifier()
  let s = new Span(body)
  c.each(s, null, 1)
  return s
}

module.exports.tests.classify = (test) => {
  let valid = [
    'McDonalds', 'McDonald\'s',
    'lone star steakhouse',
    'panda express'
  ]

  valid.forEach(token => {
    test(`classify: ${token}`, (t) => {
      let s = classify(token)
      t.deepEqual(s.classifications, {
        ChainClassification: new ChainClassification(1.0)
      })
      t.end()
    })
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`ChainClassifier: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
