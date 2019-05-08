const AddressParser = require('../parser/AddressParser')

const testcase = (test, common) => {
  let parser = new AddressParser()
  let assert = common.assert.bind(null, test, parser)

  assert('Carrer d\'Aragó 155 08011 Barcelona', [
    { street: 'Carrer d\'Aragó' }, { housenumber: '155' },
    { postcode: '08011' }, { locality: 'Barcelona' }
  ], true)
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address ESP: ${name}`, testFunction)
  }

  testcase(test, common)
}
