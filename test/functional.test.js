const testcase = (test, common) => {
  let assertFirstParseMatches = common.assertFirstParseMatches(test)
  let assertAllParsesMatch = common.assertAllParsesMatch(test)

  // street simple
  assertFirstParseMatches('main pl', [{ street: 'main pl' }])

  // street directional
  assertFirstParseMatches('west main st', [{ street: 'west main st' }])
  assertFirstParseMatches('main st west', [{ street: 'main st west' }])

  // street ordinal
  assertFirstParseMatches('10th ave', [{ street: '10th ave' }])

  // street cardinal
  assertFirstParseMatches('10 ave', [{ street: '10 ave' }])

  // address simple
  assertFirstParseMatches('1 main pl', [
    { housenumber: '1' }, { street: 'main pl' }
  ])

  // address with ordinal
  assertFirstParseMatches('100 10th ave', [
    { housenumber: '100' }, { street: '10th ave' }
  ])

  // address with cardinal
  assertFirstParseMatches('100 10 ave', [
    { housenumber: '100' }, { street: '10 ave' }
  ])

  // address with directional
  assertFirstParseMatches('1 north main blvd', [
    { housenumber: '1' }, { street: 'north main blvd' }
  ])
  assertFirstParseMatches('1 main blvd north', [
    { housenumber: '1' }, { street: 'main blvd north' }
  ])

  // address with directional & ordinal
  assertFirstParseMatches('30 west 26th street', [
    { housenumber: '30' }, { street: 'west 26th street' }
  ])

  // street with directional, ordinal & admin info
  assertFirstParseMatches('West 26th Street, New York, NYC, 10010', [
    { street: 'West 26th Street' },
    { locality: 'New York' },
    { postcode: '10010' }
  ])

  // do not classify tokens preceeded by a 'place' as
  // an admin classification
  assertFirstParseMatches('Portland Cafe Portland OR', [
    { place: 'Portland Cafe' },
    { locality: 'Portland' }, { region: 'OR' }
  ])

  // trailing directional causes issue with autocomplete
  assertFirstParseMatches('1 Foo St N', [{ housenumber: '1' }, { street: 'Foo St' }])
  assertFirstParseMatches('1 Foo St S', [{ housenumber: '1' }, { street: 'Foo St' }])
  assertFirstParseMatches('1 Foo St E', [{ housenumber: '1' }, { street: 'Foo St' }])
  assertFirstParseMatches('1 Foo St W', [{ housenumber: '1' }, { street: 'Foo St' }])

  // ...but we allow two letter directionals
  assertFirstParseMatches('1 Foo St NW', [{ housenumber: '1' }, { street: 'Foo St NW' }])
  assertFirstParseMatches('1 Foo St NE', [{ housenumber: '1' }, { street: 'Foo St NE' }])
  assertFirstParseMatches('1 Foo St SW', [{ housenumber: '1' }, { street: 'Foo St SW' }])
  assertFirstParseMatches('1 Foo St SE', [{ housenumber: '1' }, { street: 'Foo St SE' }])

  // invalid solutions (because the classification pairings dont make sense logically)
  assertAllParsesMatch('1 San Francisco', [])
  assertAllParsesMatch('1 California', [])
  assertAllParsesMatch('1 USA', [])
  assertAllParsesMatch('1 San Francisco California', [])
  assertAllParsesMatch('1 San Francisco USA', [])
  assertAllParsesMatch('1 San Francisco California USA', [])
  assertAllParsesMatch('1 California USA', [])
  assertAllParsesMatch('1 90210', [])

  // do not parse 'aus' as a locality if it follows a region
  assertFirstParseMatches('new south wales aus', [
    { region: 'new south wales' }, { country: 'aus' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`functional: ${name}`, testFunction)
  }

  testcase(test, common)
}
