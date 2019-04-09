const AddressParser = require('../parser/AddressParser')

const testcase = (test, common) => {
  let parser = new AddressParser()
  let assert = common.assert.bind(null, test, parser)

  // street simple
  assert('main pl', [[{ street: 'main pl' }]])

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
    [{ housenumber: '100' }, { street: '10 ave' }],
    [{ postcode: '100' }, { street: '10 ave' }] // @todo can we avoid this?
  ])

  // address with directional
  assert('1 north main blvd', [
    [{ housenumber: '1' }, { street: 'north main blvd' }]
  ])

  // address with directional & ordinal
  assert('30 west 26th street', [
    [{ housenumber: '30' }, { street: 'west 26th street' }]
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`functional: ${name}`, testFunction)
  }

  testcase(test, common)
}
