const Span = require('../../tokenization/Span')

module.exports.tests = {};

module.exports.tests.constructor = (test) => {
  test('constructor: defaults', (t) => {
    let span = new Span()
    t.equals(span.body, '')
    t.equals(span.start, 0)
    t.equals(span.end, 0)
    t.end()
  });

  test('constructor: string', (t) => {
    let span = new Span('example')
    t.equals(span.body, 'example')
    t.equals(span.start, 0)
    t.equals(span.end, 7)
    t.end()
  });

  test('constructor: string + start', (t) => {
    let span = new Span('example', 10)
    t.equals(span.body, 'example')
    t.equals(span.start, 10)
    t.equals(span.end, 17)
    t.end()
  });
};

module.exports.tests.setter = (test) => {
  test('setter: setChildren', (t) => {
    let span = new Span()
    t.deepEquals(span.child, [])

    let spans = [new Span('A'), new Span('B')]
    span.setChildren(spans)

    t.deepEquals(span.child, spans)
    t.end();
  });
};

module.exports.tests.intersects = (test) => {
  test('intersects: basic', (t) => {
    let spanA = new Span('A')
    let spanB = new Span('B')
    t.true(spanA.intersects(spanB))
    t.true(spanB.intersects(spanA))
    t.end()
  });

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
  });
};

module.exports.all = (tape, common) => {

  function test(name, testFunction) {
    return tape(`Span: ${name}`, testFunction);
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common);
  }
};