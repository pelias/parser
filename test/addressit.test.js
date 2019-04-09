const AddressParser = require('../parser/AddressParser')

// tests copied from 'npm addressit'
// https://github.com/DamonOehlman/addressit/tree/master/test

const testcase = (test, common) => {
  let parser = new AddressParser()
  let assert = common.assert.bind(null, test, parser)

  // Australia
  assert('2649 Logan Road, Eight Mile Plains, QLD 4113', [
    [{ housenumber: '2649' }, { street: 'Logan Road' }, { postcode: '4113' }]
  ])

  assert('2649 Logan Road Eight Mile Plains, QLD 4113', [
    [{ housenumber: '2649' }, { street: 'Logan Road' }, { postcode: '4113' }]
  ])

  assert('1 Queen Street, Brisbane 4000', [
    [{ housenumber: '1' }, { street: 'Queen Street' }, { postcode: '4000' }]
  ])

  assert('754 Robinson Rd West, Aspley, QLD 4035', [
    [{ housenumber: '754' }, { street: 'Robinson Rd West' }, { postcode: '4035' }]
  ])

  // assert('Sydney 2000', [
  //   [{ postcode: '2000' }]
  // ])

  assert('Perth', [])

  // assert('1/135 Ferny Way, Ferny Grove 4054', [
  //   [{ apartment: '1' }, { housenumber: '135' }, { street: 'Ferny Way' }]
  // ])

  // assert('Eight Mile Plains 4113', [
  //   [{ housenumber: 'Eight' }, { street: 'Mile Plains' }, { postcode: '4113' }]
  // ])

  // assert('8/437 St Kilda Road Melbourne, VIC ', [
  //   [{ apartment: '8' }, { housenumber: '437' }, { street: 'St Kilda Road' }],
  //   [{ apartment: '8' }, { housenumber: '437' }, { street: 'Kilda Road' }]
  // ])

  assert('BOOM', [])

  // assert('Eight Mile Plains 9999', [
  //   [{ postcode: '9999' }]
  // ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`functional: ${name}`, testFunction)
  }

  testcase(test, common)
}
