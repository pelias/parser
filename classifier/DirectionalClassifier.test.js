const DirectionalClassifier = require('./DirectionalClassifier')
const DirectionalClassification = require('../classification/DirectionalClassification')
const Span = require('../tokenization/Span')
const classifier = new DirectionalClassifier()

module.exports.tests = {}

function classify (body) {
  let s = new Span(body)
  classifier.each(s)
  return s
}

module.exports.tests.contains_numerals = (test) => {
  test('contains numerals: honours contains.numerals boolean', (t) => {
    let s = new Span('example')
    s.contains.numerals = true
    classifier.each(s)
    t.deepEqual(s.classifications, {})
    t.end()
  })
}

module.exports.tests.english = (test) => {
  let valid = [
    'north', 'n', 'n.',
    'south', 's', 's.',
    'east', 'e', 'e.',
    'west', 'w', 'w.',
    'northeast', 'ne', 'ne.',
    'southeast', 'se', 'se.',
    'northwest', 'nw', 'nw.',
    'southwest', 'sw', 'sw.',
    'lower', 'lwr',
    'upper', 'upr',
    'middle', 'mdl',
    'centre', 'center', 'ctr',
    'central', 'ctrl'
  ]

  let invalid = [
    'northsouth', 'ns', 'ns.',
    'westeast', 'we', 'we.'
  ]

  valid.forEach(token => {
    test(`english: ${token}`, (t) => {
      let s = classify(token)
      t.deepEqual(s.classifications, { DirectionalClassification: new DirectionalClassification(1.0) })
      t.end()
    })
  })

  invalid.forEach(token => {
    test(`english: ${token}`, (t) => {
      let s = classify(token)
      t.deepEqual(s.classifications, {})
      t.end()
    })
  })
}

module.exports.tests.spanish = (test) => {
  let valid = [
    'norte', 'n', 'n.',
    'sur', 's', 's.',
    'este', 'e', 'e.',
    'oeste', 'w', 'w.',
    'noreste', 'ne', 'ne.',
    'sureste', 'se', 'se.',
    'noroeste', 'nw', 'nw.',
    'suroeste', 'sw', 'sw.'
  ]

  let invalid = [
    'norsur', 'ns', 'ns.',
    'oesteeste', 'we', 'we.'
  ]

  valid.forEach(token => {
    test(`spanish: ${token}`, (t) => {
      let s = classify(token)
      t.deepEqual(s.classifications, { DirectionalClassification: new DirectionalClassification(1.0) })
      t.end()
    })
  })

  invalid.forEach(token => {
    test(`spanish: ${token}`, (t) => {
      let s = classify(token)
      t.deepEqual(s.classifications, {})
      t.end()
    })
  })
}

module.exports.tests.german = (test) => {
  let valid = [
    'nord', 'n', 'n.',
    'süd', 's', 's.',
    'ost', 'o', 'o.',
    'west', 'w', 'w.',
    'nordost', 'no', 'no.',
    'südost', 'so', 'so.',
    'nordwest', 'nw', 'nw.',
    'südwest', 'sw', 'sw.'
  ]

  let invalid = [
    'nordsüd', 'ns', 'ns.',
    'westost', 'wo', 'wo.'
  ]

  valid.forEach(token => {
    test(`german: ${token}`, (t) => {
      let s = classify(token)
      t.deepEqual(s.classifications, { DirectionalClassification: new DirectionalClassification(1.0) })
      t.end()
    })
  })

  invalid.forEach(token => {
    test(`german: ${token}`, (t) => {
      let s = classify(token)
      t.deepEqual(s.classifications, {})
      t.end()
    })
  })
}

module.exports.tests.french = (test) => {
  let valid = [
    'nord', 'n', 'n.',
    'sud', 's', 's.',
    'est', 'e', 'e.',
    'ouest', 'o', 'o.',
    'nord est', 'ne', 'ne.',
    'sud est', 'se', 'se.',
    'nord ouest', 'no', 'no.',
    'sud ouest', 'so', 'so.'
  ]

  let invalid = [
    'nordsud', 'ns', 'ns.',
    'ouestest', 'oe', 'oe.'
  ]

  valid.forEach(token => {
    test(`french: ${token}`, (t) => {
      let s = classify(token)
      t.deepEqual(s.classifications, { DirectionalClassification: new DirectionalClassification(1.0) })
      t.end()
    })
  })

  invalid.forEach(token => {
    test(`french: ${token}`, (t) => {
      let s = classify(token)
      t.deepEqual(s.classifications, {})
      t.end()
    })
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`DirectionalClassifier: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
