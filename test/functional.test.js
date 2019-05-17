const AddressParser = require('../parser/AddressParser')

const testcase = (test, common) => {
  let parser = new AddressParser()
  let assert = common.assert.bind(null, test, parser)

  // street simple
  assert('main pl', [{ street: 'main pl' }], true)

  // street directional
  assert('west main st', [{ street: 'west main st' }], true)
  assert('main st west', [{ street: 'main st west' }], true)

  // street ordinal
  assert('10th ave', [{ street: '10th ave' }], true)

  // street cardinal
  assert('10 ave', [{ street: '10 ave' }], true)

  // address simple
  assert('1 main pl', [
    { housenumber: '1' }, { street: 'main pl' }
  ], true)

  // address with ordinal
  assert('100 10th ave', [
    { housenumber: '100' }, { street: '10th ave' }
  ], true)

  // address with cardinal
  assert('100 10 ave', [
    { housenumber: '100' }, { street: '10 ave' }
  ], true)

  // address with directional
  assert('1 north main blvd', [
    { housenumber: '1' }, { street: 'north main blvd' }
  ], true)
  assert('1 main blvd north', [
    { housenumber: '1' }, { street: 'main blvd north' }
  ], true)

  // address with directional & ordinal
  assert('30 west 26th street', [
    { housenumber: '30' }, { street: 'west 26th street' }
  ], true)

  // street with directional, ordinal & admin info
  assert('West 26th Street, New York, NYC, 10010', [
    { street: 'West 26th Street' },
    { locality: 'New York' },
    { postcode: '10010' }
  ], true)

  // do not classify tokens preceeded by a 'place' as
  // an admin classification
  assert('Portland Cafe Portland OR', [
    { place: 'Portland Cafe' },
    { locality: 'Portland' }, { region: 'OR' }
  ], true)

  // trailing directional causes issue with autocomplete
  assert('1 Foo St N', [{ housenumber: '1' }, { street: 'Foo St' }], true)
  assert('1 Foo St S', [{ housenumber: '1' }, { street: 'Foo St' }], true)
  assert('1 Foo St E', [{ housenumber: '1' }, { street: 'Foo St' }], true)
  assert('1 Foo St W', [{ housenumber: '1' }, { street: 'Foo St' }], true)

  // ...but we allow two letter directionals
  assert('1 Foo St NW', [{ housenumber: '1' }, { street: 'Foo St NW' }], true)
  assert('1 Foo St NE', [{ housenumber: '1' }, { street: 'Foo St NE' }], true)
  assert('1 Foo St SW', [{ housenumber: '1' }, { street: 'Foo St SW' }], true)
  assert('1 Foo St SE', [{ housenumber: '1' }, { street: 'Foo St SE' }], true)

  // invalid solutions (because the classification pairings dont make sense logically)
  assert('1 San Francisco', [])
  assert('1 California', [])
  assert('1 USA', [])
  assert('1 San Francisco California', [])
  assert('1 San Francisco USA', [])
  assert('1 San Francisco California USA', [])
  assert('1 California USA', [])
  assert('1 90210', [])

  // do not parse 'aus' as a locality if it follows a region
  assert('new south wales aus', [
    { region: 'new south wales' }, { country: 'aus' }
  ], true)
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`functional: ${name}`, testFunction)
  }

  testcase(test, common)
}
