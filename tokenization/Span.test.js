const Graph = require('./Graph')
const Span = require('./Span')

module.exports.tests = {}

module.exports.tests.constructor = (test) => {
  test('constructor: defaults', (t) => {
    let span = new Span()
    t.equals(span.body, '')
    t.equals(span.norm, '')
    t.equals(span.start, 0)
    t.equals(span.end, 0)
    t.deepEquals(span.classifications, {})
    t.deepEquals(span.graph, new Graph())
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
  test('setBody: trim text when greater than 140 characters with spaces', (t) => {
    let span = new Span(`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`)
    t.equals(span.start, 0)
    t.equals(span.end, 140)
    t.end()
  })
  test(`setBody: do not trim text when it's 140 characters`, (t) => {
    let span = new Span(`LoremipsumdolorsitametconsecteturadipiscingelitseddoeiusmodtemporincididuntutlaboreetdoloremagnaaliquaUtenimadminimveniamquisnostrudexercita`)
    t.equals(span.start, 0)
    t.equals(span.end, 140)
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

module.exports.tests.covers = (test) => {
  test('covers: basic', (t) => {
    let spanA = new Span('A')
    let spanB = new Span('B')
    t.true(spanA.covers(spanB))
    t.true(spanB.covers(spanA))
    t.end()
  })

  test('covers: advanced', (t) => {
    let spanA = new Span('A')
    spanA.start = 0
    spanA.end = 10

    let spanB = new Span('B')
    spanB.start = 2
    spanB.end = 10

    let spanC = new Span('C')
    spanC.start = 0
    spanC.end = 5

    t.true(spanA.covers(spanB))
    t.false(spanB.covers(spanA))
    t.true(spanA.covers(spanC))
    t.false(spanC.covers(spanA))
    t.false(spanB.covers(spanC))
    t.false(spanC.covers(spanB))
    t.end()
  })
}

module.exports.tests.distance = (test) => {
  test('distance: same', (t) => {
    let spanA = new Span('A')
    let spanB = new Span('B')

    t.equal(0, spanA.distance(spanB))
    t.equal(0, spanB.distance(spanA))
    t.end()
  })

  test('distance: right', (t) => {
    let spanA = new Span('A')
    let spanB = new Span('B')
    spanB.start = 5
    spanB.end = 6

    t.equal(4, spanA.distance(spanB))
    t.equal(4, spanB.distance(spanA))
    t.end()
  })

  test('distance: left', (t) => {
    let spanA = new Span('A')
    spanA.start = 2
    spanA.end = 3

    let spanB = new Span('B')

    t.equal(1, spanA.distance(spanB))
    t.equal(1, spanB.distance(spanA))
    t.end()
  })
}

module.exports.tests.setChildren = (test) => {
  test('setChildren', (t) => {
    let section = new Span()
    t.deepEquals(section.graph.findAll('child'), [])

    let children = [new Span('A'), new Span('B')]
    section.setChildren(children)

    t.deepEquals(section.graph.findAll('child'), children)
    t.end()
  })
}

module.exports.tests.classify = (test) => {
  test('classify', (t) => {
    let section = new Span()
    t.deepEquals(section.classifications, {})

    let classification = new (class Mock {})()
    section.classify(classification)

    t.deepEquals(section.classifications, { Mock: classification })
    t.end()
  })
  test('classify - duplicate with lower confidence', (t) => {
    let section = new Span()
    t.deepEquals(section.classifications, {})

    let classification1 = new (class Mock { })()
    let classification2 = new (class Mock { })()
    classification1.confidence = 1
    classification2.confidence = 0.5
    section.classify(classification1)
    section.classify(classification2)

    t.deepEquals(section.classifications, { Mock: classification1 })
    t.end()
  })
  test('classify - duplicate with same confidence', (t) => {
    let section = new Span()
    t.deepEquals(section.classifications, {})

    let classification1 = new (class Mock { })()
    let classification2 = new (class Mock { })()
    classification1.confidence = 0.5
    classification2.confidence = 0.5
    section.classify(classification1)
    section.classify(classification2)

    t.deepEquals(section.classifications, { Mock: classification1 })
    t.end()
  })
  test('classify - duplicate with higher confidence', (t) => {
    let section = new Span()
    t.deepEquals(section.classifications, {})

    let classification1 = new (class Mock { })()
    let classification2 = new (class Mock { })()
    classification1.confidence = 0.5
    classification2.confidence = 1
    section.classify(classification1)
    section.classify(classification2)

    t.deepEquals(section.classifications, { Mock: classification2 })
    t.end()
  })
}

module.exports.tests.setPhrases = (test) => {
  test('setPhrases', (t) => {
    let section = new Span()
    t.deepEquals(section.graph.findAll('phrase'), [])

    let phrases = [new Span('A'), new Span('B')]
    section.setPhrases(phrases)

    t.deepEquals(section.graph.findAll('phrase'), phrases)
    t.end()
  })
}

module.exports.tests.connectSiblings = (test) => {
  test('connectSiblings - array list', (t) => {
    let spans = [new Span('A'), new Span('B'), new Span('C')]
    Span.connectSiblings(spans)
    t.deepEquals(spans[0].graph.findOne('next'), spans[1])
    t.notOk(spans[0].graph.findOne('prev'))
    t.deepEquals(spans[1].graph.findOne('next'), spans[2])
    t.deepEquals(spans[1].graph.findOne('prev'), spans[0])
    t.notOk(spans[2].graph.findOne('next'))
    t.deepEquals(spans[2].graph.findOne('prev'), spans[1])
    t.end()
  })
  test('connectSiblings - list of items', (t) => {
    let a = new Span('A')
    let b = new Span('B')
    let c = new Span('C')
    Span.connectSiblings(a, b, c)
    t.deepEquals(a.graph.findOne('next'), b)
    t.notOk(a.graph.findOne('prev'))
    t.deepEquals(b.graph.findOne('next'), c)
    t.deepEquals(b.graph.findOne('prev'), a)
    t.notOk(c.graph.findOne('next'))
    t.deepEquals(c.graph.findOne('prev'), b)
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
