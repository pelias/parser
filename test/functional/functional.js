const Tokenizer = require('../../tokenization/Tokenizer')
const AddressParser = require('../../parser/AddressParser')

module.exports.tests = {}

module.exports.tests.permutate = (test) => {
  let parser = new AddressParser()

  test('functional', (t) => {
    function run (input, expected) {
      let tokenizer = new Tokenizer(input)
      parser.classify(tokenizer)
      parser.solve(tokenizer)
      t.deepEquals(tokenizer.solution.map(s => s.map(c => {
        return {
          [c.classification.label]: c.span.body
        // offset: c.span.start
        }
      })), expected)
      t.end()
    }

    run('30 west 26th street, 10010, nyc', [
      [
        { street: 'west 26th street' },
        { housenumber: '30' },
        { postcode: '10010' }
      ],
      [
        { street: 'west 26th street' },
        { housenumber: '10010' }
      ],
      [
        { street: '26th street' },
        { housenumber: '30' },
        { postcode: '10010' }
      ],
      [
        { street: '26th street' },
        { housenumber: '10010' }
      ]
    ])
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`functional: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
