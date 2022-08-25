const Solution = require('./Solution')
const Tokenizer = require('../tokenization/Tokenizer')

module.exports.tests = {}

module.exports.tests.constructor = (test) => {
  test('constructor', (t) => {
    let sol = new Solution()
    t.deepEquals(sol.pair, [])
    t.equals(sol.score, 0.0)
    t.end()
  })
}

// @todo
// module.exports.tests.copy = (test) => {}

// @todo
// module.exports.tests.covers = (test) => {}

// @todo
// module.exports.tests.coversSameClassification = (test) => {}

// @todo
// module.exports.tests.computeScore = (test) => {}

module.exports.tests.mask = (test, common) => {
  test('mask', (t) => {
    //                            'VVVVVV VVV  SSSSSSSSSSSS NN PPPPP AAAAAA'
    let tokenizer = new Tokenizer('Kaschk Bar, Linienstraße 40 10119 Berlin')
    common.parser.classify(tokenizer)
    common.parser.solve(tokenizer)

    t.equal(tokenizer.solution[0].mask(tokenizer), 'VVVVVVVVVV  SSSSSSSSSSSS NN PPPPP AAAAAA')
    t.end()
  })
  test('mask', (t) => {
    //                            'VVV VVVV NN SSSSSSS AAAAAA PPPPP      '
    let tokenizer = new Tokenizer('Foo Cafe 10 Main St London 10010 Earth')
    common.parser.classify(tokenizer)
    common.parser.solve(tokenizer)

    t.equal(tokenizer.solution[0].mask(tokenizer), 'VVVVVVVV NN SSSSSSS AAAAAA PPPPP      ')
    t.end()
  })
  test('mask', (t) => {
    //                            'UUU UU NNN SSSSSSSSSSSSSS AAAAAAAAAAAA AAA PPPP'
    let tokenizer = new Tokenizer('Lot 12/345 Illawarra Road Marrickville NSW 2204')
    common.parser.classify(tokenizer)
    common.parser.solve(tokenizer)

    t.equal(tokenizer.solution[0].mask(tokenizer), 'VVVVVV NNN SSSSSSSSSSSSSS AAAAAAAAAAAA AAA PPPP')
    t.end()
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`Solution: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
