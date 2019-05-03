const AddressParser = require('../parser/AddressParser')

const testcase = (test, common) => {
  let parser = new AddressParser()
  let assert = common.assert.bind(null, test, parser)

  // street simple
  assert('Foostraße', [{ street: 'Foostraße' }], true)

  // should not attach a second suffix
  assert('Foostraße Rd', [{ street: 'Foostraße' }], true)
  assert('foo st and', [{ street: 'foo st' }], true)

  // address simple
  assert('Foostraße 1', [
    { street: 'Foostraße' }, { housenumber: '1' }
  ], true)
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`compound_street: ${name}`, testFunction)
  }

  testcase(test, common)
}
