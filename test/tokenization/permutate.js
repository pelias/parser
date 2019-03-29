const Span = require('../../tokenization/Span')
const permutate = require('../../tokenization/permutate')

module.exports.tests = {}

module.exports.tests.permutate = (test) => {
  test('permutate: simple', (t) => {
    let spans = [
      new Span('SoHo', 0),
      new Span('New', 5),
      new Span('York', 9),
      new Span('USA', 14)
    ]
    let actual = permutate(spans, 1, 6)
    t.deepEquals(actual, [
      new Span('SoHo New York USA', 0).setChildren(spans.slice(0, 4)),
      new Span('SoHo New York', 0).setChildren(spans.slice(0, 3)),
      new Span('SoHo New', 0).setChildren(spans.slice(0, 2)),
      new Span('SoHo', 0).setChildren(spans.slice(0, 1)),
      new Span('New York USA', 5).setChildren(spans.slice(1, 4)),
      new Span('New York', 5).setChildren(spans.slice(1, 3)),
      new Span('New', 5).setChildren(spans.slice(1, 2)),
      new Span('York USA', 9).setChildren(spans.slice(2, 4)),
      new Span('York', 9).setChildren(spans.slice(2, 3)),
      new Span('USA', 14).setChildren(spans.slice(3, 4))
    ])
    t.end()
  })

  test('permutate: tokens contain whitespace', (t) => {
    let spans = [
      new Span('SoHo', 0),
      new Span('New York', 5),
      new Span('USA', 14)
    ]
    let actual = permutate(spans, 1, 6)
    t.deepEquals(actual, [
      new Span('SoHo New York USA', 0).setChildren(spans.slice(0, 3)),
      new Span('SoHo New York', 0).setChildren(spans.slice(0, 2)),
      new Span('SoHo', 0).setChildren(spans.slice(0, 1)),
      new Span('New York USA', 5).setChildren(spans.slice(1, 3)),
      new Span('New York', 5).setChildren(spans.slice(1, 2)),
      new Span('USA', 14).setChildren(spans.slice(2, 3))
    ])
    t.end()
  })

  test('permutate: smaller window', (t) => {
    let spans = [
      new Span('SoHo', 0),
      new Span('New', 5),
      new Span('York', 9),
      new Span('USA', 13)
    ]
    let actual = permutate(spans, 1, 2)
    t.deepEquals(actual, [
      new Span('SoHo New', 0).setChildren(spans.slice(0, 2)),
      new Span('SoHo', 0).setChildren(spans.slice(0, 1)),
      new Span('New York', 5).setChildren(spans.slice(1, 3)),
      new Span('New', 5).setChildren(spans.slice(1, 2)),
      new Span('York USA', 9).setChildren(spans.slice(2, 4)),
      new Span('York', 9).setChildren(spans.slice(2, 3)),
      new Span('USA', 13).setChildren(spans.slice(3, 4))
    ])
    t.end()
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`permutate: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
