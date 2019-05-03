const AddressParser = require('../parser/AddressParser')

const testcase = (test, common) => {
  let parser = new AddressParser()
  let assert = common.assert.bind(null, test, parser)

  assert('Rue Montmartre', [
    { street: 'Rue Montmartre' }
  ], true)

  assert('123 Rue Montmartre, Paris', [
    { housenumber: '123' }, { street: 'Rue Montmartre' }, { locality: 'Paris' }
  ], true)

  assert('Rue de Paris', [
    { street: 'Rue de Paris' }
  ], true)

  assert('Rue de la Paix', [
    { street: 'Rue de la Paix' }
  ], true)
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address FRA: ${name}`, testFunction)
  }

  testcase(test, common)
}
