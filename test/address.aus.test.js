const testcase = (test, common) => {
  let assert = common.assert(test)

  assert('6000, NSW, Australia', [
    { postcode: '6000' },
    { region: 'NSW' }, { country: 'Australia' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address AUS: ${name}`, testFunction)
  }

  testcase(test, common)
}
