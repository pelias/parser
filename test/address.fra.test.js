const AddressParser = require('../parser/AddressParser')

const testcase = (test, common) => {
  let parser = new AddressParser()
  let assert = common.assert.bind(null, test, parser)

  assert('Rue Montmartre', [
    [{ street: 'Rue Montmartre' }],
    [{ locality: 'Montmartre' }]
  ])

  assert('123 Rue Montmartre, Paris', [
    [{ housenumber: '123' }, { street: 'Rue Montmartre' }, { locality: 'Paris' }],
    [{ housenumber: '123' }, { street: 'Rue Montmartre' }, { region: 'Paris' }]
  ])

  assert('Rue de Paris', [
    [{ street: 'Rue de Paris' }],
    [{ region: 'de' }, { locality: 'Paris' }], // @incorrect
    [{ region: 'Paris' }] // @incorrect
  ])

  assert('Rue de la Paix', [
    [{ street: 'Rue de la Paix' }],
    [{ region: 'de' }, { locality: 'la' }], // @incorrect
    [{ region: 'la' }] // @incorrect
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address FRA: ${name}`, testFunction)
  }

  testcase(test, common)
}
