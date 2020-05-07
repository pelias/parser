const testcase = (test, common) => {
  let assertFirstMatch = common.assertFirstMatch(test)
  let assertAllMatch = common.assertAllMatch(test)

  // street simple
  assertFirstMatch('main pl', [{ street: 'main pl' }])

  // street directional
  assertFirstMatch('west main st', [{ street: 'west main st' }])
  assertFirstMatch('main st west', [{ street: 'main st west' }])

  // street ordinal
  assertFirstMatch('10th ave', [{ street: '10th ave' }])

  // street cardinal
  assertFirstMatch('10 ave', [{ street: '10 ave' }])

  // address simple
  assertFirstMatch('1 main pl', [
    { housenumber: '1' }, { street: 'main pl' }
  ])

  // address with ordinal
  assertFirstMatch('100 10th ave', [
    { housenumber: '100' }, { street: '10th ave' }
  ])

  // address with cardinal
  assertFirstMatch('100 10 ave', [
    { housenumber: '100' }, { street: '10 ave' }
  ])

  // address with directional
  assertFirstMatch('1 north main blvd', [
    { housenumber: '1' }, { street: 'north main blvd' }
  ])
  assertFirstMatch('1 main blvd north', [
    { housenumber: '1' }, { street: 'main blvd north' }
  ])

  // address with directional & ordinal
  assertFirstMatch('30 west 26th street', [
    { housenumber: '30' }, { street: 'west 26th street' }
  ])

  // street with directional, ordinal & admin info
  assertFirstMatch('West 26th Street, New York, NYC, 10010', [
    { street: 'West 26th Street' },
    { locality: 'New York' },
    { postcode: '10010' }
  ])

  // do not classify tokens preceeded by a 'place' as
  // an admin classification
  assertFirstMatch('Portland Cafe Portland OR', [
    { place: 'Portland Cafe' },
    { locality: 'Portland' }, { region: 'OR' }
  ])

  // trailing directional causes issue with autocomplete
  assertFirstMatch('1 Foo St N', [{ housenumber: '1' }, { street: 'Foo St' }])
  assertFirstMatch('1 Foo St S', [{ housenumber: '1' }, { street: 'Foo St' }])
  assertFirstMatch('1 Foo St E', [{ housenumber: '1' }, { street: 'Foo St' }])
  assertFirstMatch('1 Foo St W', [{ housenumber: '1' }, { street: 'Foo St' }])

  // ...but we allow two letter directionals
  assertFirstMatch('1 Foo St NW', [{ housenumber: '1' }, { street: 'Foo St NW' }])
  assertFirstMatch('1 Foo St NE', [{ housenumber: '1' }, { street: 'Foo St NE' }])
  assertFirstMatch('1 Foo St SW', [{ housenumber: '1' }, { street: 'Foo St SW' }])
  assertFirstMatch('1 Foo St SE', [{ housenumber: '1' }, { street: 'Foo St SE' }])

  // invalid solutions (because the classification pairings dont make sense logically)
  assertAllMatch('1 San Francisco', [])
  assertAllMatch('1 California', [])
  assertAllMatch('1 USA', [])
  assertAllMatch('1 San Francisco California', [])
  assertAllMatch('1 San Francisco USA', [])
  assertAllMatch('1 San Francisco California USA', [])
  assertAllMatch('1 California USA', [])
  assertAllMatch('1 90210', [])

  // do not parse 'aus' as a locality if it follows a region
  assertFirstMatch('new south wales aus', [
    { region: 'new south wales' }, { country: 'aus' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`functional: ${name}`, testFunction)
  }

  testcase(test, common)
}
