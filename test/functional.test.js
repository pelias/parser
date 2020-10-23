const testcase = (test, common) => {
  let assert = common.assert(test)

  // street simple
  assert('main pl', [{ street: 'main pl' }])

  // street directional
  assert('west main st', [{ street: 'west main st' }])
  assert('main st west', [{ street: 'main st west' }])

  // street ordinal
  assert('10th ave', [{ street: '10th ave' }])

  // street cardinal
  assert('10 ave', [{ street: '10 ave' }])

  // address simple
  assert('1 main pl', [
    { housenumber: '1' }, { street: 'main pl' }
  ])

  // address with ordinal
  assert('100 10th ave', [
    { housenumber: '100' }, { street: '10th ave' }
  ])

  // address with cardinal
  assert('100 10 ave', [
    { housenumber: '100' }, { street: '10 ave' }
  ])

  // address with directional
  assert('1 north main blvd', [
    { housenumber: '1' }, { street: 'north main blvd' }
  ])
  assert('1 main blvd north', [
    { housenumber: '1' }, { street: 'main blvd north' }
  ])

  // address with directional & ordinal
  assert('30 west 26th street', [
    { housenumber: '30' }, { street: 'west 26th street' }
  ])

  // street with directional, ordinal & admin info
  assert('West 26th Street, New York, NYC, 10010', [
    { street: 'West 26th Street' },
    { locality: 'New York' },
    { postcode: '10010' }
  ])

  // do not classify tokens preceeded by a 'place' as
  // an admin classification
  assert('Portland Cafe Portland OR', [
    { venue: 'Portland Cafe' },
    { locality: 'Portland' }, { region: 'OR' }
  ])

  // trailing directional causes issue with autocomplete
  assert('1 Foo St N', [{ housenumber: '1' }, { street: 'Foo St' }])
  assert('1 Foo St S', [{ housenumber: '1' }, { street: 'Foo St' }])
  assert('1 Foo St E', [{ housenumber: '1' }, { street: 'Foo St' }])
  assert('1 Foo St W', [{ housenumber: '1' }, { street: 'Foo St' }])

  // ...but we allow two letter directionals
  assert('1 Foo St NW', [{ housenumber: '1' }, { street: 'Foo St NW' }])
  assert('1 Foo St NE', [{ housenumber: '1' }, { street: 'Foo St NE' }])
  assert('1 Foo St SW', [{ housenumber: '1' }, { street: 'Foo St SW' }])
  assert('1 Foo St SE', [{ housenumber: '1' }, { street: 'Foo St SE' }])

  // invalid solutions (because the classification pairings dont make sense logically)
  assert('1 San Francisco', [], false)
  assert('1 California', [], false)
  assert('1 USA', [], false)
  assert('1 San Francisco California', [], false)
  assert('1 San Francisco USA', [], false)
  assert('1 San Francisco California USA', [], false)
  assert('1 California USA', [], false)
  assert('1 90210', [], false)

  // unit type specified with no accompanying unit number, unit type should
  // be removed by the OrphanedUnitTypeDeclassifier.
  assert('Apartment', [], false)
  assert('Unit', [], false)
  assert('Space', [], false)

  // do not parse 'aus' as a locality if it follows a region
  assert('new south wales aus', [
    { region: 'new south wales' }, { country: 'aus' }
  ])

  // test that we don't interpret "ga" as a street suffix
  assert('jasper ga', [{ locality: 'jasper' }, { region: 'ga' }])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`functional: ${name}`, testFunction)
  }

  testcase(test, common)
}
