const testcase = (test, common) => {
  let assert = common.assert(test)

  assert('Air & Space Museum Washington DC', [
    { venue: 'Air & Space Museum' },
    { locality: 'Washington' }, { region: 'DC' }
  ])

  assert('Empire State Building NYC', [
    { venue: 'Empire State Building' },
    { locality: 'NYC' }
  ])

  // checking that "art" is not interpreted as a street suffix
  assert('philadelphia museum of art', [
    { venue: 'philadelphia museum of art' }
  ])

  // common venue suffixes containing ampersand
  assert('Bar & Grill', [{ venue: 'Bar & Grill' }])
  assert('Restaurant & Bar', [{ venue: 'Restaurant & Bar' }])
  assert('Cafe & Pub', [{ venue: 'Cafe & Pub' }])

  // venue names containing ampersand
  assert('Andy\'s Bar & Grill', [
    { venue: 'Andy\'s Bar & Grill' }
  ])
  assert('Adams Family Restaurant & Bar', [
    { venue: 'Adams Family Restaurant & Bar' }
  ])
  // assert('Kells Irish Restaurant & Pub', [
  //   { venue: 'Kells Irish Restaurant & Pub' }
  // ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`USA: ${name}`, testFunction)
  }

  testcase(test, common)
}
