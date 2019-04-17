const Span = require('./Span')
const permutate = require('./permutate')

module.exports.tests = {}

module.exports.tests.permutate = (test) => {
  test('permutate: simple', (t) => {
    let spans = [
      new Span('SoHo', 0),
      new Span('New', 5),
      new Span('York', 9),
      new Span('USA', 14)
    ]

    // expected permutations
    let perm1 = new Span('SoHo New York USA', 0)
    spans.slice(0, 4).forEach(s => perm1.graph.add('child', s))
    perm1.graph.add('child:first', spans[0])
    perm1.graph.add('child:last', spans[3])

    let perm2 = new Span('SoHo New York', 0)
    spans.slice(0, 3).forEach(s => perm2.graph.add('child', s))
    perm2.graph.add('child:first', spans[0])
    perm2.graph.add('child:last', spans[2])

    let perm3 = new Span('SoHo New', 0)
    spans.slice(0, 2).forEach(s => perm3.graph.add('child', s))
    perm3.graph.add('child:first', spans[0])
    perm3.graph.add('child:last', spans[1])

    let perm4 = new Span('SoHo', 0)
    spans.slice(0, 1).forEach(s => perm4.graph.add('child', s))
    perm4.graph.add('child:first', spans[0])
    perm4.graph.add('child:last', spans[0])

    let perm5 = new Span('New York USA', 5)
    spans.slice(1, 4).forEach(s => perm5.graph.add('child', s))
    perm5.graph.add('child:first', spans[1])
    perm5.graph.add('child:last', spans[3])

    let perm6 = new Span('New York', 5)
    spans.slice(1, 3).forEach(s => perm6.graph.add('child', s))
    perm6.graph.add('child:first', spans[1])
    perm6.graph.add('child:last', spans[2])

    let perm7 = new Span('New', 5)
    spans.slice(1, 2).forEach(s => perm7.graph.add('child', s))
    perm7.graph.add('child:first', spans[1])
    perm7.graph.add('child:last', spans[1])

    let perm8 = new Span('York USA', 9)
    spans.slice(2, 4).forEach(s => perm8.graph.add('child', s))
    perm8.graph.add('child:first', spans[2])
    perm8.graph.add('child:last', spans[3])

    let perm9 = new Span('York', 9)
    spans.slice(2, 3).forEach(s => perm9.graph.add('child', s))
    perm9.graph.add('child:first', spans[2])
    perm9.graph.add('child:last', spans[2])

    let perm10 = new Span('USA', 14)
    spans.slice(3, 4).forEach(s => perm10.graph.add('child', s))
    perm10.graph.add('child:first', spans[3])
    perm10.graph.add('child:last', spans[3])

    let actual = permutate(spans, 1, 6)
    t.deepEquals(actual, [
      perm1, perm2, perm3, perm4, perm5,
      perm6, perm7, perm8, perm9, perm10
    ])
    t.end()
  })

  test('permutate: tokens contain whitespace', (t) => {
    let spans = [
      new Span('SoHo', 0),
      new Span('New York', 5),
      new Span('USA', 14)
    ]

    // expected permutations
    let perm1 = new Span('SoHo New York USA', 0)
    spans.slice(0, 3).forEach(s => perm1.graph.add('child', s))
    perm1.graph.add('child:first', spans[0])
    perm1.graph.add('child:last', spans[2])

    let perm2 = new Span('SoHo New York', 0)
    spans.slice(0, 2).forEach(s => perm2.graph.add('child', s))
    perm2.graph.add('child:first', spans[0])
    perm2.graph.add('child:last', spans[1])

    let perm3 = new Span('SoHo', 0)
    spans.slice(0, 1).forEach(s => perm3.graph.add('child', s))
    perm3.graph.add('child:first', spans[0])
    perm3.graph.add('child:last', spans[0])

    let perm4 = new Span('New York USA', 5)
    spans.slice(1, 3).forEach(s => perm4.graph.add('child', s))
    perm4.graph.add('child:first', spans[1])
    perm4.graph.add('child:last', spans[2])

    let perm5 = new Span('New York', 5)
    spans.slice(1, 2).forEach(s => perm5.graph.add('child', s))
    perm5.graph.add('child:first', spans[1])
    perm5.graph.add('child:last', spans[1])

    let perm6 = new Span('USA', 14)
    spans.slice(2, 3).forEach(s => perm6.graph.add('child', s))
    perm6.graph.add('child:first', spans[2])
    perm6.graph.add('child:last', spans[2])

    let actual = permutate(spans, 1, 6)
    t.deepEquals(actual, [
      perm1, perm2, perm3, perm4, perm5, perm6
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

    // expected permutations
    let perm1 = new Span('SoHo New', 0)
    spans.slice(0, 2).forEach(s => perm1.graph.add('child', s))
    perm1.graph.add('child:first', spans[0])
    perm1.graph.add('child:last', spans[1])

    let perm2 = new Span('SoHo', 0)
    spans.slice(0, 1).forEach(s => perm2.graph.add('child', s))
    perm2.graph.add('child:first', spans[0])
    perm2.graph.add('child:last', spans[0])

    let perm3 = new Span('New York', 5)
    spans.slice(1, 3).forEach(s => perm3.graph.add('child', s))
    perm3.graph.add('child:first', spans[1])
    perm3.graph.add('child:last', spans[2])

    let perm4 = new Span('New', 5)
    spans.slice(1, 2).forEach(s => perm4.graph.add('child', s))
    perm4.graph.add('child:first', spans[1])
    perm4.graph.add('child:last', spans[1])

    let perm5 = new Span('York USA', 9)
    spans.slice(2, 4).forEach(s => perm5.graph.add('child', s))
    perm5.graph.add('child:first', spans[2])
    perm5.graph.add('child:last', spans[3])

    let perm6 = new Span('York', 9)
    spans.slice(2, 3).forEach(s => perm6.graph.add('child', s))
    perm6.graph.add('child:first', spans[2])
    perm6.graph.add('child:last', spans[2])

    let perm7 = new Span('USA', 13)
    spans.slice(3, 4).forEach(s => perm7.graph.add('child', s))
    perm7.graph.add('child:first', spans[3])
    perm7.graph.add('child:last', spans[3])

    let actual = permutate(spans, 1, 2)
    t.deepEquals(actual, [
      perm1, perm2, perm3, perm4, perm5, perm6, perm7
    ])
    t.end()
  })

  test('permutate: start/end values', (t) => {
    // "  SoHo     New  York  "
    let span1 = new Span('SoHo', 2)
    span1.end = 6
    let span2 = new Span('New', 11)
    span2.end = 14
    let span3 = new Span('York', 15)
    span3.end = 19
    let spans = [span1, span2, span3]

    // expected permutations
    let perm1 = new Span('SoHo New York', 2)
    perm1.start = span1.start
    perm1.end = span3.end
    spans.slice(0, 3).forEach(s => perm1.graph.add('child', s))
    perm1.graph.add('child:first', spans[0])
    perm1.graph.add('child:last', spans[2])

    let perm2 = new Span('SoHo New', 2)
    perm2.start = span1.start
    perm2.end = span2.end
    spans.slice(0, 2).forEach(s => perm2.graph.add('child', s))
    perm2.graph.add('child:first', spans[0])
    perm2.graph.add('child:last', spans[1])

    let perm3 = new Span('SoHo', 2)
    perm3.start = span1.start
    perm3.end = span1.end
    spans.slice(0, 1).forEach(s => perm3.graph.add('child', s))
    perm3.graph.add('child:first', spans[0])
    perm3.graph.add('child:last', spans[0])

    let perm4 = new Span('New York', 11)
    perm4.start = span2.start
    perm4.end = span3.end
    spans.slice(1, 3).forEach(s => perm4.graph.add('child', s))
    perm4.graph.add('child:first', spans[1])
    perm4.graph.add('child:last', spans[2])

    let perm5 = new Span('New', 11)
    perm5.start = span2.start
    perm5.end = span2.end
    spans.slice(1, 2).forEach(s => perm5.graph.add('child', s))
    perm5.graph.add('child:first', spans[1])
    perm5.graph.add('child:last', spans[1])

    let perm6 = new Span('York', 15)
    perm6.start = span3.start
    perm6.end = span3.end
    spans.slice(2, 3).forEach(s => perm6.graph.add('child', s))
    perm6.graph.add('child:first', spans[2])
    perm6.graph.add('child:last', spans[2])

    let actual = permutate(spans, 1, 6)
    t.deepEquals(actual, [
      perm1, perm2, perm3, perm4, perm5, perm6
    ])
    t.end()
  })

  test('permutate: relationships', (t) => {
    let span1 = new Span('SoHo', 0)
    let span2 = new Span('New', 5)
    let span3 = new Span('York', 14)
    let spans = [span1, span2, span3]

    let actual = permutate(spans, 1, 6)

    // Soho New York
    let perm1 = actual[0]
    t.true(perm1.graph.findAll('child').includes(span1))
    t.true(span1.graph.findAll('parent').includes(perm1))
    t.true(perm1.graph.findAll('child').includes(span2))
    t.true(span2.graph.findAll('parent').includes(perm1))
    t.true(perm1.graph.findAll('child').includes(span3))
    t.true(span3.graph.findAll('parent').includes(perm1))

    // Soho New
    let perm2 = actual[1]
    t.true(perm2.graph.findAll('child').includes(span1))
    t.true(span1.graph.findAll('parent').includes(perm2))
    t.true(perm2.graph.findAll('child').includes(span2))
    t.true(span2.graph.findAll('parent').includes(perm2))

    // Soho
    let perm3 = actual[2]
    t.true(perm3.graph.findAll('child').includes(span1))
    t.true(span1.graph.findAll('parent').includes(perm3))

    // New York
    let perm4 = actual[3]
    t.true(perm4.graph.findAll('child').includes(span2))
    t.true(span2.graph.findAll('parent').includes(perm4))
    t.true(perm4.graph.findAll('child').includes(span3))
    t.true(span3.graph.findAll('parent').includes(perm4))

    // New
    let perm5 = actual[4]
    t.true(perm5.graph.findAll('child').includes(span2))
    t.true(span2.graph.findAll('parent').includes(perm5))

    // York
    let perm6 = actual[5]
    t.true(perm6.graph.findAll('child').includes(span3))
    t.true(span3.graph.findAll('parent').includes(perm6))

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
