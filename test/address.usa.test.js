const AddressParser = require('../parser/AddressParser')

const testcase = (test, common) => {
  let parser = new AddressParser()
  let assert = common.assert.bind(null, test, parser)

  assert('Martin Luther King Jr. Blvd.', [
    { street: 'Martin Luther King Jr. Blvd.' }
  ], true)

  assert('Martin Luther King Blvd.', [
    { street: 'Martin Luther King Blvd.' }
  ], true)
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`USA: ${name}`, testFunction)
  }

  testcase(test, common)
}
