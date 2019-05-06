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

  assert('Boulevard du Général Charles De Gaulle', [
    { street: 'Boulevard du Général Charles De Gaulle' }
  ], true)

  assert('11 Boulevard Saint Germains', [
    { housenumber: '11' }, { street: 'Boulevard Saint Germains' }
  ], true)

  assert('Rue Saint Anne', [
    { street: 'Rue Saint Anne' }
  ], true)

  assert('Boulevard Charles De Gaulle', [
    { street: 'Boulevard Charles De Gaulle' }
  ], true)

  assert('Allée Victor Hugo', [
    { street: 'Allée Victor Hugo' }
  ], true)

  assert('Avenue Aristide Briand', [
    { street: 'Avenue Aristide Briand' }
  ], true)
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address FRA: ${name}`, testFunction)
  }

  testcase(test, common)
}
