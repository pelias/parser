const UnitTypeClassifier = require('./UnitTypeClassifier')
const UnitTypeClassification = require('../classification/UnitTypeClassification')
const Span = require('../tokenization/Span')
const classifier = new UnitTypeClassifier()

module.exports.tests = {}

function classify (body) {
  let s = new Span(body)
  classifier.each(s, null, 1)
  return s
}

module.exports.tests.english_unit_types = (test) => {
  let valid = [
    'unit', 'apt', 'lot'
  ]

  valid.forEach(token => {
    test(`english unit types: ${token}`, (t) => {
      let s = classify(token)

      t.deepEqual(s.classifications, {
        UnitTypeClassification: new UnitTypeClassification(1, { })
      })
      t.end()
    })
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`UnitTypeClassifier: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
