const testcase = (test, common) => {
  let assert = common.assert(test)

  assert('Carrer d\'Aragó 155 08011 Barcelona', [
    { street: 'Carrer d\'Aragó' }, { housenumber: '155' },
    { postcode: '08011' }, { locality: 'Barcelona' }
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
