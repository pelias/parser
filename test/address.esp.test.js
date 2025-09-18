const testcase = (test, common) => {
  let assert = common.assert(test)

  assert('Carrer d\'Aragó 155 08011 Barcelona', [
    { street: 'Carrer d\'Aragó' }, { housenumber: '155' },
    { postcode: '08011' }, { locality: 'Barcelona' }
  ])

  // note: the desired behavior here is to not include the 'B' in the housenumber
  // as it is more likely to be part of the administrative unit.
  assert('Calle Principal 20 B', [
    { street: 'Calle Principal' }, { housenumber: '20' }
  ])

  assert('Calle Principal 20 Barcelona', [
    { street: 'Calle Principal' }, { housenumber: '20' },
    { locality: 'Barcelona' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address ESP: ${name}`, testFunction)
  }

  testcase(test, common)
}
