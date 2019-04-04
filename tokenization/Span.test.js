const Span = require('./Span')

module.exports.tests = {}

module.exports.tests.constructor = (test) => {
  test('constructor: defaults', (t) => {
    let span = new Span()
    t.equals(span.body, '')
    t.equals(span.norm, '')
    t.equals(span.start, 0)
    t.equals(span.end, 0)
    t.deepEquals(span.child, [])
    t.deepEquals(span.permutation, [])
    t.false(span.contains.numerals)
    t.false(span.contains.final.period)
    t.end()
  })

  test('constructor: string', (t) => {
    let span = new Span('Example')
    t.equals(span.body, 'Example')
    t.equals(span.norm, 'example')
    t.equals(span.start, 0)
    t.equals(span.end, 7)
    t.deepEquals(span.child, [])
    t.deepEquals(span.permutation, [])
    t.false(span.contains.numerals)
    t.false(span.contains.final.period)
    t.end()
  })

  test('constructor: string + start', (t) => {
    let span = new Span('Example', 10)
    t.equals(span.body, 'Example')
    t.equals(span.norm, 'example')
    t.equals(span.start, 10)
    t.equals(span.end, 17)
    t.deepEquals(span.child, [])
    t.deepEquals(span.permutation, [])
    t.false(span.contains.numerals)
    t.false(span.contains.final.period)
    t.end()
  })
}

module.exports.tests.setBody = (test) => {
  test('setBody: empty string', (t) => {
    let span = new Span('Example')
    span.setBody('')
    t.equals(span.body, '')
    t.equals(span.norm, '')
    t.equals(span.start, 0)
    t.equals(span.end, 0)
    t.deepEquals(span.child, [])
    t.deepEquals(span.permutation, [])
    t.false(span.contains.numerals)
    t.false(span.contains.final.period)
    t.end()
  })
  test('setBody: update body', (t) => {
    let span = new Span('Example')
    t.equals(span.body, 'Example')
    span.setBody('Foo')
    t.equals(span.body, 'Foo')
    t.end()
  })
  test('setBody: update norm', (t) => {
    let span = new Span('Example')
    t.equals(span.norm, 'example')
    span.setBody('Foo')
    t.equals(span.norm, 'foo')
    t.end()
  })
  test('setBody: update end', (t) => {
    let span = new Span('Example', 10)
    t.equals(span.start, 10)
    t.equals(span.end, 17)
    span.setBody('Foo')
    t.equals(span.start, 10)
    t.equals(span.end, 13)
    t.end()
  })
  test('setBody: update contains.numerals', (t) => {
    let span = new Span('Example')
    t.false(span.contains.numerals)
    span.setBody('foo1bar')
    t.true(span.contains.numerals)
    t.end()
  })
  test('setBody: update contains.final.period', (t) => {
    let span = new Span('Example')
    t.false(span.contains.final.period)
    span.setBody('Foo.')
    t.true(span.contains.final.period)
    t.end()
  })
}

module.exports.tests.setter = (test) => {
  test('setter: setChildren', (t) => {
    let section = new Span()
    t.deepEquals(section.child, [])

    let sections = [new Span('A'), new Span('B')]
    section.setChildren(sections)

    t.deepEquals(section.child, sections)
    t.end()
  })
}

module.exports.tests.intersects = (test) => {
  test('intersects: basic', (t) => {
    let spanA = new Span('A')
    let spanB = new Span('B')
    t.true(spanA.intersects(spanB))
    t.true(spanB.intersects(spanA))
    t.end()
  })

  test('intersects: advanced', (t) => {
    let spanA = new Span('A')
    spanA.start = 0
    spanA.end = 1

    let spanB = new Span('B')
    spanB.start = 1
    spanB.end = 2

    let spanC = new Span('C')
    spanC.start = 0
    spanC.end = 2

    t.false(spanA.intersects(spanB))
    t.false(spanB.intersects(spanA))
    t.true(spanA.intersects(spanC))
    t.true(spanC.intersects(spanA))
    t.true(spanB.intersects(spanC))
    t.true(spanC.intersects(spanB))
    t.end()
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`Span: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
