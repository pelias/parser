const AddressParser = require('../parser/AddressParser')

const testcase = (test, common) => {
  let parser = new AddressParser()
  let assert = common.assert.bind(null, test, parser)

  // street simple
  assert('main pl', [[{ street: 'main pl' }]])

  // street directional
  assert('west main st', [[{ street: 'west main st' }]])
  assert('main st west', [[{ street: 'main st west' }]])

  // street ordinal
  assert('10th ave', [[{ street: '10th ave' }]])

  // street cardinal
  assert('10 ave', [[{ street: '10 ave' }]])

  // address simple
  assert('1 main pl', [
    [{ housenumber: '1' }, { street: 'main pl' }]
  ])

  // address with ordinal
  assert('100 10th ave', [
    [{ housenumber: '100' }, { street: '10th ave' }]
  ])

  // address with cardinal
  assert('100 10 ave', [
    [{ housenumber: '100' }, { street: '10 ave' }]
  ])

  // address with directional
  assert('1 north main blvd', [
    [{ housenumber: '1' }, { street: 'north main blvd' }]
  ])
  assert('1 main blvd north', [
    [{ housenumber: '1' }, { street: 'main blvd north' }]
  ])

  // address with directional & ordinal
  assert('30 west 26th street', [
    [{ housenumber: '30' }, { street: 'west 26th street' }]
  ])

  // street with directional, ordinal & admin info
  assert('West 26th Street, New York, NYC, 10010', [
    [{ street: 'West 26th Street' }, { locality: 'New York' }, { postcode: '10010' }]
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`functional: ${name}`, testFunction)
  }

  testcase(test, common)
}
