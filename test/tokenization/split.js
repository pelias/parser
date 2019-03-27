const Span = require('../../tokenization/Span')
const split = require('../../tokenization/split')
const funcs = require('../../tokenization/split_funcs')

module.exports.tests = {};

module.exports.tests.boundary = (test) => {
  test('boundary: no commas or quotes', (t) => {
    let span = new Span('SoHo New York USA')
    let actual = split(span, funcs.fieldsFuncBoundary)

    t.equals(actual[0].body, 'SoHo New York USA')
    t.equals(actual[0].start, 0)
    t.equals(actual[0].end, 17)
    t.end();
  });

  test('boundary: commas', (t) => {
    let span = new Span('SoHo,,, New York, USA')
    let actual = split(span, funcs.fieldsFuncBoundary)

    t.equals(actual[0].body, 'SoHo')
    t.equals(actual[0].start, 0)
    t.equals(actual[0].end, 4)

    t.equals(actual[1].body, ' New York')
    t.equals(actual[1].start, 7)
    t.equals(actual[1].end, 16)

    t.equals(actual[2].body, ' USA')
    t.equals(actual[2].start, 17)
    t.equals(actual[2].end, 21)
    t.end();
  });

  test('boundary: quotes', (t) => {
    let span = new Span('SoHo "New York" USA')
    let actual = split(span, funcs.fieldsFuncBoundary)

    t.equals(actual[0].body, 'SoHo ')
    t.equals(actual[0].start, 0)
    t.equals(actual[0].end, 5)

    t.equals(actual[1].body, 'New York')
    t.equals(actual[1].start, 6)
    t.equals(actual[1].end, 14)

    t.equals(actual[2].body, ' USA')
    t.equals(actual[2].start, 15)
    t.equals(actual[2].end, 19)
    t.end();
  });
};

module.exports.tests.whitespace = (test) => {
  test('whitespace: no whitespace', (t) => {
    let span = new Span('SoHo')
    let actual = split(span, funcs.fieldsFuncWhiteSpace)

    t.equals(actual[0].body, 'SoHo')
    t.equals(actual[0].start, 0)
    t.equals(actual[0].end, 4)
    t.end();
  });

  test('whitespace: contains whitespace', (t) => {
    let span = new Span('SoHo\t New York \n USA')
    let actual = split(span, funcs.fieldsFuncWhiteSpace)

    t.equals(actual[0].body, 'SoHo')
    t.equals(actual[0].start, 0)
    t.equals(actual[0].end, 4)

    t.equals(actual[1].body, 'New')
    t.equals(actual[1].start, 6)
    t.equals(actual[1].end, 9)

    t.equals(actual[2].body, 'York')
    t.equals(actual[2].start, 10)
    t.equals(actual[2].end, 14)

    t.equals(actual[3].body, 'USA')
    t.equals(actual[3].start, 17)
    t.equals(actual[3].end, 20)
    t.end();
  });
};

module.exports.all = (tape, common) => {

  function test(name, testFunction) {
    return tape(`split: ${name}`, testFunction);
  }

  for( var testCase in module.exports.tests ){
    module.exports.tests[testCase](test, common);
  }
};