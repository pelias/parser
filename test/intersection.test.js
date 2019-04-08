const AddressParser = require('../parser/AddressParser')

const testcase = (test, common) => {
  let parser = new AddressParser()
  let assert = common.assert.bind(null, test, parser)

  // intersection queries
  assert('Corner of Main St & Second Ave', [
    [{ street: 'Main St' }, { street: 'Second Ave' }],
    [{ street: 'Second Ave' }],
    [{ street: 'Main St' }]
  ])

  assert('Main St & Second Ave', [
    [{ street: 'Main St' }, { street: 'Second Ave' }],
    [{ street: 'Second Ave' }],
    [{ street: 'Main St' }]
  ])

  assert('Main St @ Second Ave', [
    [{ street: 'Main St' }, { street: 'Second Ave' }],
    [{ street: 'Second Ave' }],
    [{ street: 'Main St' }]
  ])

  assert('Gleimstraße zwischen Schönhauser Allee', [
    [{ street: 'Gleimstraße' }, { street: 'Schönhauser Allee' }],
    [{ street: 'Schönhauser Allee' }],
    [{ street: 'Gleimstraße' }]
  ])

  assert('cnr west st and north ave', [
    [{ street: 'west st' }, { street: 'north ave' }],
    [{ street: 'north ave' }],
    [{ street: 'west st' }]
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`intersection: ${name}`, testFunction)
  }

  testcase(test, common)
}
