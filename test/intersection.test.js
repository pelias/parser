const AddressParser = require('../parser/AddressParser')

const testcase = (test, common) => {
  let parser = new AddressParser()
  let assert = common.assert.bind(null, test, parser)

  // intersection queries
  assert('Corner of Main St & Second Ave', [
    [{ street: 'Main St' }, { street: 'Second Ave' }]
  ])

  assert('Main St & Second Ave', [
    [{ street: 'Main St' }, { street: 'Second Ave' }]
  ])

  assert('Main St @ Second Ave', [
    [{ street: 'Main St' }, { street: 'Second Ave' }]
  ])

  assert('Gleimstraße zwischen Schönhauser Allee', [
    [{ street: 'Gleimstraße' }, { street: 'Schönhauser Allee' }]
  ])

  assert('cnr west st and north ave', [
    [{ street: 'west st' }, { street: 'north ave' }]
  ])

  // should not consider intersection tokens for street name
  assert('& b', [])
  assert('a &', [])

  // no street suffix
  assert('foo & bar', [
    [{ street: 'foo' }, { street: 'bar' }]
  ])
  assert('foo and bar', [
    [{ street: 'foo' }, { street: 'bar' }]
  ])
  assert('foo at bar', [
    [{ street: 'foo' }, { street: 'bar' }]
  ])
  assert('foo @ bar', [
    [{ street: 'foo' }, { street: 'bar' }]
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`intersection: ${name}`, testFunction)
  }

  testcase(test, common)
}
