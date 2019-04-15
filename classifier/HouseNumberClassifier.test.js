const HouseNumberClassifier = require('./HouseNumberClassifier')
const HouseNumberClassification = require('../classification/HouseNumberClassification')
const Span = require('../tokenization/Span')

module.exports.tests = {}

function classify (body) {
  let c = new HouseNumberClassifier()
  let s = new Span(body)
  c.each(s)
  return s
}

module.exports.tests.contains_numerals = (test) => {
  test('contains numerals: honours contains.numerals boolean', (t) => {
    let c = new HouseNumberClassifier()
    let s = new Span('100')
    s.contains.numerals = false
    c.each(s)
    t.deepEqual(s.classifications, {})
    t.end()
  })
}

module.exports.tests.numeric = (test) => {
  test('numeric: single digit', (t) => {
    let s = classify('1')
    t.deepEqual(s.classifications, { HouseNumberClassification: new HouseNumberClassification(1.0) })
    t.end()
  })
  test('numeric: two digits', (t) => {
    let s = classify('12')
    t.deepEqual(s.classifications, { HouseNumberClassification: new HouseNumberClassification(1.0) })
    t.end()
  })
  test('numeric: three digits', (t) => {
    let s = classify('123')
    t.deepEqual(s.classifications, { HouseNumberClassification: new HouseNumberClassification(1.0) })
    t.end()
  })
  test('numeric: four digits', (t) => {
    let s = classify('1234')
    t.deepEqual(s.classifications, { HouseNumberClassification: new HouseNumberClassification(0.7) })
    t.end()
  })
  test('numeric: five digits', (t) => {
    let s = classify('12345')
    t.deepEqual(s.classifications, { HouseNumberClassification: new HouseNumberClassification(0.2) })
    t.end()
  })
  test('numeric: six digits', (t) => {
    let s = classify('123456')
    t.deepEqual(s.classifications, {})
    t.end()
  })
}

module.exports.tests.letter_suffix = (test) => {
  test('letter suffix: single digit', (t) => {
    let s = classify('1A')
    t.deepEqual(s.classifications, { HouseNumberClassification: new HouseNumberClassification(1.0) })
    t.end()
  })
  test('letter suffix: two digits', (t) => {
    let s = classify('12b')
    t.deepEqual(s.classifications, { HouseNumberClassification: new HouseNumberClassification(1.0) })
    t.end()
  })
  test('letter suffix: three digits', (t) => {
    let s = classify('123C')
    t.deepEqual(s.classifications, { HouseNumberClassification: new HouseNumberClassification(1.0) })
    t.end()
  })
  test('letter suffix: four digits', (t) => {
    let s = classify('1234d')
    t.deepEqual(s.classifications, { HouseNumberClassification: new HouseNumberClassification(0.7) })
    t.end()
  })
  test('letter suffix: five digits', (t) => {
    let s = classify('12345E')
    t.deepEqual(s.classifications, { HouseNumberClassification: new HouseNumberClassification(0.2) })
    t.end()
  })
  test('letter suffix: six digits', (t) => {
    let s = classify('123456f')
    t.deepEqual(s.classifications, {})
    t.end()
  })
  test('letter suffix: Cyrillic', (t) => {
    let s = classify('15в')
    t.deepEqual(s.classifications, { HouseNumberClassification: new HouseNumberClassification(1.0) })
    t.end()
  })
  test('letter suffix: Cyrillic', (t) => {
    let s = classify('15б')
    t.deepEqual(s.classifications, { HouseNumberClassification: new HouseNumberClassification(1.0) })
    t.end()
  })
}

module.exports.tests.hyphenated = (test) => {
  test('hyphenated: 10-19', (t) => {
    let s = classify('10-19')
    t.deepEqual(s.classifications, { HouseNumberClassification: new HouseNumberClassification(1.0) })
    t.end()
  })
  test('hyphenated: 10-19a', (t) => {
    let s = classify('10-19a')
    t.deepEqual(s.classifications, { HouseNumberClassification: new HouseNumberClassification(1.0) })
    t.end()
  })
  test('hyphenated: 10-19B', (t) => {
    let s = classify('10-19B')
    t.deepEqual(s.classifications, { HouseNumberClassification: new HouseNumberClassification(1.0) })
    t.end()
  })
}

module.exports.tests.misc = (test) => {
  test('misc: 6N23', (t) => {
    let s = classify('6N23')
    t.deepEqual(s.classifications, { HouseNumberClassification: new HouseNumberClassification(1.0) })
    t.end()
  })
  test('misc: W350N5337', (t) => {
    let s = classify('W350N5337')
    t.deepEqual(s.classifications, { HouseNumberClassification: new HouseNumberClassification(1.0) })
    t.end()
  })
  test('misc: N453', (t) => {
    let s = classify('N453')
    t.deepEqual(s.classifications, { HouseNumberClassification: new HouseNumberClassification(1.0) })
    t.end()
  })
  // test('misc: д. 1, кв. 1', (t) => {
  //   let s = classify('д. 1, кв. 1')
  //   t.deepEqual(s.classifications, { HouseNumberClassification: new HouseNumberClassification(1.0) })
  //   t.end()
  // })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`HouseNumberClassifier: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
