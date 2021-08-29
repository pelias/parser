const testcase = (test, common) => {
  let assert = common.assert(test)

  assert('Gamla Varmdovagen 6', [
    { street: 'Gamla Varmdovagen' }, { housenumber: '6' }
  ])

  assert('Gamla Varmdovägen 6', [
    { street: 'Gamla Varmdovägen' }, { housenumber: '6' }
  ])

  assert('Gamla Varmdo vägen 6', [
    { street: 'Gamla Varmdo vägen' }, { housenumber: '6' }
  ])

  assert('Ångermannagatan 80, Vällingby', [
    { street: 'Ångermannagatan' }, { housenumber: '80' } /*, { locality: 'Vällingby' } */
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address AUS: ${name}`, testFunction)
  }

  testcase(test, common)
}
