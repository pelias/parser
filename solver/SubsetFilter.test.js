const Tokenizer = require('../tokenization/Tokenizer')
const Span = require('../tokenization/Span')
const HouseNumberClassification = require('../classification/HouseNumberClassification')
const StreetClassification = require('../classification/StreetClassification')
const Solution = require('./Solution')
const SolutionPair = require('./SolutionPair')
const SubsetFilter = require('./SubsetFilter')

module.exports.tests = {}

module.exports.tests.duplicate = (test) => {
  test('duplicate: remove dupes', (t) => {
    let tok = new Tokenizer()

    let sp1 = new SolutionPair(new Span('A'), new HouseNumberClassification(1.0))
    let sp2 = new SolutionPair(new Span('B'), new StreetClassification(1.0))

    let s1 = new Solution([sp1, sp2])
    let s2 = new Solution([sp1, sp2])

    tok.solution = [ s1, s2, s1, s2, s1 ]

    let c = new SubsetFilter()
    c.solve(tok)

    t.deepEquals(tok.solution, [ s1 ])
    t.end()
  })
}

module.exports.tests.subset = (test) => {
  test('subset: remove subsets', (t) => {
    let tok = new Tokenizer()

    let sp1 = new SolutionPair(new Span('A'), new HouseNumberClassification(1.0))
    let sp2 = new SolutionPair(new Span('BCD'), new StreetClassification(1.0))
    let s1 = new Solution([sp1, sp2])

    let sp3 = new SolutionPair(new Span('A'), new HouseNumberClassification(1.0))
    let sp4 = new SolutionPair(new Span('B'), new StreetClassification(1.0))
    let sp5 = new SolutionPair(new Span('C'), new StreetClassification(1.0))
    let sp6 = new SolutionPair(new Span('D'), new StreetClassification(1.0))
    let s2 = new Solution([sp3, sp4, sp5, sp6])

    tok.solution = [s1, s2]

    let c = new SubsetFilter()
    c.solve(tok)

    t.deepEquals(tok.solution, [s1])
    t.end()
  })
}

module.exports.tests.intersection_subset = (test) => {
  test('subset: remove intersection subsets', (t) => {
    let tok = new Tokenizer()

    let sp1 = new SolutionPair(new Span('foo'), new StreetClassification(1.0))
    let sp2 = new SolutionPair(new Span('bar'), new StreetClassification(1.0))
    let s1 = new Solution([sp1, sp2])

    let sp3 = new SolutionPair(new Span('bar'), new StreetClassification(1.0))
    let s2 = new Solution([sp3])

    tok.solution = [s1, s2]

    let c = new SubsetFilter()
    c.solve(tok)

    t.deepEquals(tok.solution, [s1])
    t.end()
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`SubsetFilter: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
