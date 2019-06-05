const AddressParser = require('../parser/AddressParser')

const testcase = (test, common) => {
  let parser = new AddressParser()
  let assert = common.assert.bind(null, test, parser)

  assert('Stop 1', [
    { place: 'Stop 1' }
  ], true)

  assert('Stop 10010', [
    { place: 'Stop 10010' }
  ], true)
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`Transit: ${name}`, testFunction)
  }

  testcase(test, common)
}
