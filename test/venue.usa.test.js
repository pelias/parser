const testcase = (test, common) => {
  let assert = common.assert(test)

  assert('Air & Space Museum Washington DC', [
    { place: 'Air & Space Museum' },
    { locality: 'Washington' }, { region: 'DC' }
  ])

  assert('Empire State Building NYC', [
    { place: 'Empire State Building' },
    { locality: 'NYC' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`USA: ${name}`, testFunction)
  }

  testcase(test, common)
}
