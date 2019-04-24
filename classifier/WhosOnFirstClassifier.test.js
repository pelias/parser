const WhosOnFirstClassifier = require('./WhosOnFirstClassifier')
const AreaClassification = require('../classification/AreaClassification')
const Span = require('../tokenization/Span')

module.exports.tests = {}

function classify (body) {
  let c = new WhosOnFirstClassifier()
  let s = new Span(body)
  c.each(s, null, 1)
  return s
}

module.exports.tests.country = (test) => {
  let valid = [
    'united states of america', 'united states', 'usa',
    'australia', 'aus',
    'germany', 'deutschland', 'deu'
  ]

  valid.forEach(token => {
    test(`country: ${token}`, (t) => {
      let s = classify(token)
      t.deepEqual(s.classifications, {
        AreaClassification: new AreaClassification(1.0)
      })
      t.end()
    })
  })
}

// module.exports.tests.locality = (test) => {
//   let valid = [
//     'new york', 'new your city', 'nyc',
//     'london', 'paris', 'berlin', 'bern',
//     'tokyo'
//   ]

//   valid.forEach(token => {
//     test(`locality: ${token}`, (t) => {
//       let s = classify(token)
//       t.deepEqual(s.classifications, {
//         AreaClassification: new AreaClassification(1.0)
//       })
//       t.end()
//     })
//   })
// }

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`WhosOnFirstClassifier: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
