const testcase = (test, common) => {
  let assertFirstSolution = common.assertFirstSolution(test)
  let assertFirstSolutions = common.assertFirstSolutions(test)

  // street simple
  assertFirstSolution('main pl', [{ street: 'main pl' }])

  // street directional
  assertFirstSolution('west main st', [{ street: 'west main st' }])
  assertFirstSolution('main st west', [{ street: 'main st west' }])

  // street ordinal
  assertFirstSolution('10th ave', [{ street: '10th ave' }])

  // street cardinal
  assertFirstSolution('10 ave', [{ street: '10 ave' }])

  // address simple
  assertFirstSolution('1 main pl', [
    { housenumber: '1' }, { street: 'main pl' }
  ])

  // address with ordinal
  assertFirstSolution('100 10th ave', [
    { housenumber: '100' }, { street: '10th ave' }
  ])

  // address with cardinal
  assertFirstSolution('100 10 ave', [
    { housenumber: '100' }, { street: '10 ave' }
  ])

  // address with directional
  assertFirstSolution('1 north main blvd', [
    { housenumber: '1' }, { street: 'north main blvd' }
  ])
  assertFirstSolution('1 main blvd north', [
    { housenumber: '1' }, { street: 'main blvd north' }
  ])

  // address with directional & ordinal
  assertFirstSolution('30 west 26th street', [
    { housenumber: '30' }, { street: 'west 26th street' }
  ])

  // street with directional, ordinal & admin info
  assertFirstSolution('West 26th Street, New York, NYC, 10010', [
    { street: 'West 26th Street' },
    { locality: 'New York' },
    { postcode: '10010' }
  ])

  // do not classify tokens preceeded by a 'place' as
  // an admin classification
  assertFirstSolution('Portland Cafe Portland OR', [
    { place: 'Portland Cafe' },
    { locality: 'Portland' }, { region: 'OR' }
  ])

  // trailing directional causes issue with autocomplete
  assertFirstSolution('1 Foo St N', [{ housenumber: '1' }, { street: 'Foo St' }])
  assertFirstSolution('1 Foo St S', [{ housenumber: '1' }, { street: 'Foo St' }])
  assertFirstSolution('1 Foo St E', [{ housenumber: '1' }, { street: 'Foo St' }])
  assertFirstSolution('1 Foo St W', [{ housenumber: '1' }, { street: 'Foo St' }])

  // ...but we allow two letter directionals
  assertFirstSolution('1 Foo St NW', [{ housenumber: '1' }, { street: 'Foo St NW' }])
  assertFirstSolution('1 Foo St NE', [{ housenumber: '1' }, { street: 'Foo St NE' }])
  assertFirstSolution('1 Foo St SW', [{ housenumber: '1' }, { street: 'Foo St SW' }])
  assertFirstSolution('1 Foo St SE', [{ housenumber: '1' }, { street: 'Foo St SE' }])

  // invalid solutions (because the classification pairings dont make sense logically)
  assertFirstSolutions('1 San Francisco', [])
  assertFirstSolutions('1 California', [])
  assertFirstSolutions('1 USA', [])
  assertFirstSolutions('1 San Francisco California', [])
  assertFirstSolutions('1 San Francisco USA', [])
  assertFirstSolutions('1 San Francisco California USA', [])
  assertFirstSolutions('1 California USA', [])
  assertFirstSolutions('1 90210', [])

  // do not parse 'aus' as a locality if it follows a region
  assertFirstSolution('new south wales aus', [
    { region: 'new south wales' }, { country: 'aus' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`functional: ${name}`, testFunction)
  }

  testcase(test, common)
}
