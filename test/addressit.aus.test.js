const AddressParser = require('../parser/AddressParser')

// tests copied from 'npm addressit'
// https://github.com/DamonOehlman/addressit/tree/master/test

const testcase = (test, common) => {
  let parser = new AddressParser()
  let assert = common.assert.bind(null, test, parser)

  assert('2649 Logan Road, Eight Mile Plains, QLD 4113', [
    { housenumber: '2649' }, { street: 'Logan Road' },
    { locality: 'Eight Mile Plains' },
    { region: 'QLD' }, { postcode: '4113' }
  ], true)

  assert('2649 Logan Road Eight Mile Plains, QLD 4113', [
    { housenumber: '2649' }, { street: 'Logan Road' },
    { locality: 'Eight Mile Plains' },
    { region: 'QLD' }, { postcode: '4113' }
  ], true)

  assert('1 Queen Street, Brisbane 4000', [
    { housenumber: '1' }, { street: 'Queen Street' },
    { locality: 'Brisbane' }, { postcode: '4000' }
  ], true)

  assert('754 Robinson Rd West, Aspley, QLD 4035', [
    { housenumber: '754' }, { street: 'Robinson Rd West' },
    { locality: 'Aspley' }, { region: 'QLD' }, { postcode: '4035' }
  ], true)

  assert('Sydney 2000', [
    { locality: 'Sydney' }, { postcode: '2000' }
  ], true)

  assert('Perth', [{ locality: 'Perth' }], true)

  assert('1/135 Ferny Way, Ferny Grove 4054', [
    { housenumber: '1/135' }, { street: 'Ferny Way' },
    { locality: 'Ferny Grove' }, { postcode: '4054' }
  ], true)

  assert('Eight Mile Plains 4113', [
    { locality: 'Eight Mile Plains' }, { postcode: '4113' }
  ], true)

  assert('8/437 St Kilda Road Melbourne, VIC ', [
    { housenumber: '8/437' }, { street: 'St Kilda Road' },
    { locality: 'Melbourne' }, { region: 'VIC' }
  ], true)

  assert('BOOM', [{ locality: 'BOOM' }], true)

  assert('Eight Mile Plains 9999', [
    { locality: 'Eight Mile Plains' }, { postcode: '9999' }
  ], true)
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`addressit AUS: ${name}`, testFunction)
  }

  testcase(test, common)
}
