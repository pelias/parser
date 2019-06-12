const WhosOnFirstClassifier = require('./WhosOnFirstClassifier')
const Span = require('../tokenization/Span')
const classifier = new WhosOnFirstClassifier()

module.exports.tests = {}

function classify (body) {
  let s = new Span(body)
  classifier.each(s, null, 1)
  return s
}

// module.exports.tests.country = (test) => {
//   let valid = [
//     'united states', 'usa',
//     'australia', 'aus',
//     'germany', 'deutschland', 'deu'
//   ]

//   valid.forEach(token => {
//     test(`country: ${token}`, (t) => {
//       let s = classify(token)
//       t.deepEqual(s.classifications, {
//         AreaClassification: new AreaClassification(1.0)
//       })
//       t.end()
//     })
//   })
// }

module.exports.tests.locality = (test) => {
  let valid = [
    'new york',
    'london', 'paris', 'berlin', 'bern',
    'tokyo'
  ]

  valid.forEach(token => {
    test(`locality: ${token}`, (t) => {
      let s = classify(token)
      t.true(s.classifications.hasOwnProperty('LocalityClassification'))
      t.true(s.classifications.hasOwnProperty('AreaClassification'))
      t.end()
    })
  })
}

module.exports.tests.valid_pelias_localities = (test) => {
  let valid = ['nyc', 'sf']

  valid.forEach(token => {
    test(`valid pelias locality: ${token}`, (t) => {
      let s = classify(token)
      t.true(s.classifications.hasOwnProperty('LocalityClassification'))
      t.true(s.classifications.hasOwnProperty('AreaClassification'))
      t.end()
    })
  })
}

module.exports.tests.invalid_pelias_localities = (test) => {
  let invalid = ['texas', 'california', 'italy']

  invalid.forEach(token => {
    test(`invalid pelias locality: ${token}`, (t) => {
      let s = classify(token)
      t.false(s.classifications.hasOwnProperty('LocalityClassification'))
      t.end()
    })
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`WhosOnFirstClassifier: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
