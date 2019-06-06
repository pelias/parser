const AddressParser = require('../parser/AddressParser')

const testcase = (test, common) => {
  let parser = new AddressParser()
  let assert = common.assert.bind(null, test, parser)

  assert('6000, NSW, Australia', [
    { postcode: '6000' },
    { region: 'NSW' }, { country: 'Australia' }
  ], true)
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address AUS: ${name}`, testFunction)
  }

  testcase(test, common)
}
