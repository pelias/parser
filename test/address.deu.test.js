const AddressParser = require('../parser/AddressParser')

const testcase = (test, common) => {
  let parser = new AddressParser()
  let assert = common.assert.bind(null, test, parser)

  assert('Am Falkpl. 5, 10437 Berlin', [
    { street: 'Am Falkpl.' }, { housenumber: '5' },
    { postcode: '10437' }, { region: 'Berlin' }
  ], true)

  assert('Am Bürgerpark 15-18, 13156, Berlin', [
    { street: 'Am Bürgerpark' }, { housenumber: '15-18' },
    { postcode: '13156' }, { region: 'Berlin' }
  ], true)
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address DEU: ${name}`, testFunction)
  }

  testcase(test, common)
}
