const deepEqual = require('deep-eql')
const Span = require('./Span')
const split = require('./split')
const funcs = require('./split_funcs')

module.exports.tests = {}

module.exports.tests.boundary = (test) => {
  test('boundary: no commas or quotes', (t) => {
    let span = new Span('SoHo New York USA')
    let actual = split(span, funcs.fieldsFuncBoundary)

    t.deepEquals(actual, [
      new Span('SoHo New York USA')
    ])
    t.end()
  })

  test('boundary: commas', (t) => {
    let span = new Span('SoHo,,, New York, USA')
    let actual = split(span, funcs.fieldsFuncBoundary)

    let token1 = new Span('SoHo', 0)
    let token2 = new Span(' New York', 7)
    let token3 = new Span(' USA', 17)

    // relationships
    token1.graph.add('next', token2)
    token2.graph.add('prev', token1)
    token2.graph.add('next', token3)
    token3.graph.add('prev', token2)

    t.true(deepEqual(actual, [token1, token2, token3]))
    t.end()
  })

  test('boundary: quotes', (t) => {
    let span = new Span('SoHo "New York" USA')
    let actual = split(span, funcs.fieldsFuncBoundary)

    let token1 = new Span('SoHo ', 0)
    let token2 = new Span('New York', 6)
    let token3 = new Span(' USA', 15)

    // relationships
    token1.graph.add('next', token2)
    token2.graph.add('prev', token1)
    token2.graph.add('next', token3)
    token3.graph.add('prev', token2)

    t.true(deepEqual(actual, [token1, token2, token3]))
    t.end()
  })
}

module.exports.tests.whitespace = (test) => {
  test('whitespace: no whitespace', (t) => {
    let span = new Span('SoHo')
    let actual = split(span, funcs.fieldsFuncWhiteSpace)

    t.deepEquals(actual, [
      new Span('SoHo')
    ])
    t.end()
  })

  test('whitespace: contains whitespace', (t) => {
    let span = new Span('SoHo\t New York \n USA')
    let actual = split(span, funcs.fieldsFuncWhiteSpace)

    let token1 = new Span('SoHo', 0)
    let token2 = new Span('New', 6)
    let token3 = new Span('York', 10)
    let token4 = new Span('USA', 17)

    // relationships
    token1.graph.add('next', token2)
    token2.graph.add('prev', token1)
    token2.graph.add('next', token3)
    token3.graph.add('prev', token2)
    token3.graph.add('next', token4)
    token4.graph.add('prev', token3)

    t.true(deepEqual(actual, [token1, token2, token3, token4]))
    t.end()
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`split: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
