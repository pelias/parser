const PostcodeClassifier = require('./PostcodeClassifier')
const PostcodeClassification = require('../classification/PostcodeClassification')
const Span = require('../tokenization/Span')
const classifier = new PostcodeClassifier()

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

module.exports.tests.classify = (test) => {
  test('classify: USA ZIP', (t) => {
    let s = classify('10010')
    t.deepEqual(s.classifications, { PostcodeClassification: new PostcodeClassification(1.0) })
    t.end()
  })
  test('classify: USA ZIP Plus 4', (t) => {
    let s = classify('99577-0727')
    t.deepEqual(s.classifications, { PostcodeClassification: new PostcodeClassification(1.0) })
    t.end()
  })
  test('classify: DEU', (t) => {
    let s = classify('10117')
    t.deepEqual(s.classifications, { PostcodeClassification: new PostcodeClassification(1.0) })
    t.end()
  })
  test('classify: NZD', (t) => {
    let s = classify('6012')
    t.deepEqual(s.classifications, { PostcodeClassification: new PostcodeClassification(1.0) })
    t.end()
  })
  test('classify: AUD', (t) => {
    let s = classify('2000')
    t.deepEqual(s.classifications, { PostcodeClassification: new PostcodeClassification(1.0) })
    t.end()
  })
  test('classify: FRA', (t) => {
    let s = classify('75000')
    t.deepEqual(s.classifications, { PostcodeClassification: new PostcodeClassification(1.0) })
    t.end()
  })
  test('classify: GBP', (t) => {
    let s = classify('E81DN')
    t.deepEqual(s.classifications, { PostcodeClassification: new PostcodeClassification(1.0) })
    t.end()
  })
  test('classify: JAP', (t) => {
    let s = classify('100-0000')
    t.deepEqual(s.classifications, { PostcodeClassification: new PostcodeClassification(1.0) })
    t.end()
  })
  test('classify: RUS', (t) => {
    let s = classify('101000')
    t.deepEqual(s.classifications, { PostcodeClassification: new PostcodeClassification(1.0) })
    t.end()
  })
  test('classify: BRA', (t) => {
    let s = classify('18180-000')
    t.deepEqual(s.classifications, { PostcodeClassification: new PostcodeClassification(1.0) })
    t.end()
  })
  test('classify: NLD', (t) => {
    let s = classify('7512EC')
    t.deepEqual(s.classifications, { PostcodeClassification: new PostcodeClassification(1.0) })
    t.end()
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`PostcodeClassifier: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
