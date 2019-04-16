const funcs = require('./split_funcs')

module.exports.tests = {}

module.exports.tests.exports = (test) => {
  test('exports: fieldsFuncBoundary', (t) => {
    t.deepEquals('function', typeof funcs.fieldsFuncBoundary)
    t.deepEquals(1, funcs.fieldsFuncBoundary.length)
    t.end()
  })
  test('exports: fieldsFuncWhiteSpace', (t) => {
    t.deepEquals('function', typeof funcs.fieldsFuncWhiteSpace)
    t.deepEquals(1, funcs.fieldsFuncWhiteSpace.length)
    t.end()
  })
}

module.exports.tests.fieldsFuncBoundary = (test) => {
  test('fieldsFuncBoundary', (t) => {
    t.true(funcs.fieldsFuncBoundary(','))
    t.true(funcs.fieldsFuncBoundary('\n'))
    t.true(funcs.fieldsFuncBoundary('\t'))
    t.true(funcs.fieldsFuncBoundary('"'))
    t.false(funcs.fieldsFuncBoundary('A'))
    t.false(funcs.fieldsFuncBoundary('1'))
    t.end()
  })
}

module.exports.tests.fieldsFuncWhiteSpace = (test) => {
  test('fieldsFuncWhiteSpace', (t) => {
    t.true(funcs.fieldsFuncWhiteSpace(' '))
    t.true(funcs.fieldsFuncWhiteSpace('\xa0')) // non-breaking space
    t.true(funcs.fieldsFuncWhiteSpace('\t'))
    t.true(funcs.fieldsFuncWhiteSpace('\n'))
    t.false(funcs.fieldsFuncWhiteSpace('A'))
    t.false(funcs.fieldsFuncWhiteSpace('1'))
    t.end()
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`split_funcs: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
