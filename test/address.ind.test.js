const AddressParser = require('../parser/AddressParser')

const testcase = (test, common) => {
  let parser = new AddressParser()
  let assert = common.assert.bind(null, test, parser)

  assert('100, Mahalakshmi Rd, Ganesh Nagar, Kirti Nagar, New Sanghavi, Pimpri-Chinchwad, Maharashtra 411027', [
    { housenumber: '100' }, { street: 'Mahalakshmi Rd' },
    { locality: 'Pimpri-Chinchwad' }, { region: 'Maharashtra' },
    { postcode: '411027' }
  ], true)
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address IND: ${name}`, testFunction)
  }

  testcase(test, common)
}
