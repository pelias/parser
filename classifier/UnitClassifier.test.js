const UnitClassifier = require('./UnitClassifier')
const UnitClassification = require('../classification/UnitClassification')
const UnitTypeClassification = require('../classification/UnitTypeClassification')
const Span = require('../tokenization/Span')
const classifier = new UnitClassifier()

module.exports.tests = {}

function classify (body, prev) {
  let s = new Span(body)
  if (prev) {
    let p = new Span(prev)
    p.classify(new UnitTypeClassification(1.0))
    s.graph.add('prev', p)
  }
  classifier.each(s)
  return s
}

module.exports.tests.without_unit_type = (test) => {
  test('number without unit type', (t) => {
    let s = classify('2020')
    t.deepEqual(s.classifications, { })
    t.end()
  })
  test('letter without unit type', (t) => {
    let s = classify('alpha')
    t.deepEqual(s.classifications, { })
    t.end()
  })
  test('number and letter without unit type', (t) => {
    let s = classify('2020a')
    t.deepEqual(s.classifications, { })
    t.end()
  })
  test('letter and number without unit type', (t) => {
    let s = classify('a2')
    t.deepEqual(s.classifications, { })
    t.end()
  })
  test('single letter without unit type', (t) => {
    let s = classify('a')
    t.deepEqual(s.classifications, { })
    t.end()
  })
  test('number with # without unit type', (t) => {
    let s = classify('#22')
    t.deepEqual(s.classifications, { })
    t.end()
  })
  test('number with # without unit type with prev token', (t) => {
    let s = new Span('#22')
    let p = new Span('prev')
    s.graph.add('prev', p)
    classifier.each(s)
    t.deepEqual(s.classifications, { UnitClassification: new UnitClassification(1.0) })
    t.end()
  })
}

module.exports.tests.with_unit_type = (test) => {
  test('number with unit type', (t) => {
    let s = classify('2020', 'unit')
    t.deepEqual(s.classifications, { UnitClassification: new UnitClassification(1.0) })
    t.end()
  })
  test('letters with unit type', (t) => {
    let s = classify('alpha', 'unit')
    t.deepEqual(s.classifications, { })
    t.end()
  })
  test('number and letter with unit type', (t) => {
    let s = classify('2020a', 'unit')
    t.deepEqual(s.classifications, { UnitClassification: new UnitClassification(1.0) })
    t.end()
  })
  test('letter and number with unit type', (t) => {
    let s = classify('a2', 'unit')
    t.deepEqual(s.classifications, { UnitClassification: new UnitClassification(1.0) })
    t.end()
  })
  test('single letter with unit type', (t) => {
    let s = classify('a', 'unit')
    t.deepEqual(s.classifications, { UnitClassification: new UnitClassification(1.0) })
    t.end()
  })
  test('number with # with unit type', (t) => {
    let s = classify('#22', 'unit')
    t.deepEqual(s.classifications, { UnitClassification: new UnitClassification(1.0) })
    t.end()
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`UnitClassification: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
