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

    t.deepEquals(actual, [
      new Span('SoHo'),
      new Span(' New York', 7),
      new Span(' USA', 17)
    ])
    t.end()
  })

  test('boundary: quotes', (t) => {
    let span = new Span('SoHo "New York" USA')
    let actual = split(span, funcs.fieldsFuncBoundary)

    t.deepEquals(actual, [
      new Span('SoHo '),
      new Span('New York', 6),
      new Span(' USA', 15)
    ])
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

    t.deepEquals(actual, [
      new Span('SoHo'),
      new Span('New', 6),
      new Span('York', 10),
      new Span('USA', 17)
    ])
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
