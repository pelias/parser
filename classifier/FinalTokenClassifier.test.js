const FinalTokenClassifier = require('./FinalTokenClassifier')
const Tokenizer = require('../tokenization/Tokenizer')

module.exports.tests = {}

function classify (body) {
  let c = new FinalTokenClassifier()
  let t = new Tokenizer(body)
  c.classify(t)

  // generate an array containing all the spans
  // with a final token classification
  let classifications = {
    FinalTokenClassification: [],
    FinalTokenSingleCharacterClassification: []
  }
  t.section.forEach(s => {
    s.graph.findAll('child').forEach(c => {
      if (c.classifications.hasOwnProperty('FinalTokenClassification')) {
        classifications.FinalTokenClassification.push(c)
      }
      if (c.classifications.hasOwnProperty('FinalTokenSingleCharacterClassification')) {
        classifications.FinalTokenSingleCharacterClassification.push(c)
      }
    })
  })
  return classifications
}

module.exports.tests.classify = (test) => {
  test('classify: empty string', (t) => {
    let c = classify('')
    t.equals(c.FinalTokenClassification.length, 0)
    t.equals(c.FinalTokenSingleCharacterClassification.length, 0)
    t.end()
  })

  test('classify: A', (t) => {
    let c = classify('A')
    t.equals(c.FinalTokenClassification.length, 1)
    t.equals(c.FinalTokenClassification[0].body, 'A')
    t.equals(c.FinalTokenSingleCharacterClassification.length, 1)
    t.equals(c.FinalTokenSingleCharacterClassification[0].body, 'A')
    t.end()
  })

  test('classify: A B', (t) => {
    let c = classify('A B')
    t.equals(c.FinalTokenClassification.length, 1)
    t.equals(c.FinalTokenClassification[0].body, 'B')
    t.equals(c.FinalTokenSingleCharacterClassification.length, 1)
    t.equals(c.FinalTokenSingleCharacterClassification[0].body, 'B')
    t.end()
  })

  test('classify: A BC', (t) => {
    let c = classify('A BC')
    t.equals(c.FinalTokenClassification.length, 1)
    t.equals(c.FinalTokenClassification[0].body, 'BC')
    t.equals(c.FinalTokenSingleCharacterClassification.length, 0)
    t.end()
  })

  test('classify: A BC, D', (t) => {
    let c = classify('A BC, D')
    t.equals(c.FinalTokenClassification.length, 1)
    t.equals(c.FinalTokenClassification[0].body, 'D')
    t.equals(c.FinalTokenSingleCharacterClassification.length, 1)
    t.equals(c.FinalTokenSingleCharacterClassification[0].body, 'D')
    t.end()
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`FinalTokenClassifier: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
