const ToponymClassifier = require('./ToponymClassifier')
const ToponymClassification = require('../classification/ToponymClassification')
const Span = require('../tokenization/Span')
const classifier = new ToponymClassifier()

module.exports.tests = {}

function classify (body) {
  let s = new Span(body)
  classifier.each(s, null, 1)
  return s
}

module.exports.tests.contains_numerals = (test) => {
  test('contains numerals: honours contains.numerals boolean', (t) => {
    let s = new Span('example')
    s.contains.numerals = true
    classifier.each(s, null, 1)
    t.deepEqual(s.classifications, {})
    t.end()
  })
}

module.exports.tests.single_character_tokens = (test) => {
  test('index: does not contain single char tokens', (t) => {
    t.false(Object.keys(classifier.index).some(token => token.length < 2))
    t.end()
  })
}

module.exports.tests.english_suffix = (test) => {
  let valid = [
    'md', 'maryland', 'ca',
    'california', 'ia', 'nj'
  ]

  valid.forEach(token => {
    test(`english toponyms: ${token}`, (t) => {
      let s = classify(token)

      t.deepEqual(s.classifications, {
        ToponymClassification: new ToponymClassification(1, { langs: { en: true } })
      })
      t.end()
    })
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`ToponymClassifier: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
