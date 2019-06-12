const testcase = (test, common) => {
  let assert = common.assert(test)

  assert('Air & Space Museum Washington DC', [
    { place: 'Air & Space Museum' },
    { locality: 'Washington' }, { region: 'DC' }
  ], true)
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`USA: ${name}`, testFunction)
  }

  testcase(test, common)
}
