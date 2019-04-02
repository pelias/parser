const Tokenizer = require('../../tokenization/Tokenizer')
const AddressParser = require('../../parser/AddressParser')

module.exports.tests = {}

module.exports.tests.permutate = (test) => {
  let parser = new AddressParser()

  function assert (input, expected) {
    let tokenizer = new Tokenizer(input)
    parser.classify(tokenizer)
    parser.solve(tokenizer)
    test(input, (t) => {
      t.deepEquals(tokenizer.solution.map(s => s.pair.map(c => {
        return {
          [c.classification.label]: c.span.body
          // offset: c.span.start
        }
      })), expected)
      t.end()
    })
  }

  // street simple
  assert('main pl', [[{ street: 'main pl' }]])

  // street ordinal
  assert('10th ave', [[{ street: '10th ave' }]])

  // street cardinal
  assert('10 ave', [[{ street: '10 ave' }]])

  // address simple
  assert('1 main pl', [
    [{ street: 'main pl' }, { housenumber: '1' }]
  ])

  // address with ordinal
  assert('100 10th ave', [
    [{ street: '10th ave' }, { housenumber: '100' }]
  ])

  // address with cardinal
  assert('100 10 ave', [
    [{ street: '10 ave' }, { housenumber: '100' }],
    [{ street: '10 ave' }, { postcode: '100' }] // @todo can we avoid this?
  ])

  // address with directional
  assert('1 north main blvd', [
    [{ street: 'north main blvd' }, { housenumber: '1' }],
    [{ street: 'main blvd' }, { housenumber: '1' }] // @todo can we remove this?
  ])

  // address with directional & ordinal
  assert('30 west 26th street', [
    [{ street: 'west 26th street' }, { housenumber: '30' }],
    [{ street: '26th street' }, { housenumber: '30' }]
  ])

  // intersection queries
  assert('Corner of Main St & Second Ave', [
    [{ street: 'Second Ave' }, { street: 'Main St' }],
    [{ street: 'Second Ave' }],
    [{ street: 'Main St' }]
  ])

  assert('Main St & Second Ave', [
    [{ street: 'Second Ave' }, { street: 'Main St' }],
    [{ street: 'Second Ave' }],
    [{ street: 'Main St' }]
  ])

  assert('Main St @ Second Ave', [
    [{ street: 'Second Ave' }, { street: 'Main St' }],
    [{ street: 'Second Ave' }],
    [{ street: 'Main St' }]
  ])

  assert('Gleimstraße zwischen Schönhauser Allee', [
    [{ street: 'Schönhauser Allee' }, { street: 'Gleimstraße' }],
    [{ street: 'Schönhauser Allee' }],
    [{ street: 'Gleimstraße' }]
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`functional: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
