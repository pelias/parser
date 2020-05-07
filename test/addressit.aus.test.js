// tests copied from 'npm addressit'
// https://github.com/DamonOehlman/addressit/tree/master/test

const testcase = (test, common) => {
  let assertFirstMatch = common.assertFirstMatch(test)

  assertFirstMatch('2649 Logan Road, Eight Mile Plains, QLD 4113', [
    { housenumber: '2649' }, { street: 'Logan Road' },
    { locality: 'Eight Mile Plains' },
    { region: 'QLD' }, { postcode: '4113' }
  ])

  assertFirstMatch('2649 Logan Road Eight Mile Plains, QLD 4113', [
    { housenumber: '2649' }, { street: 'Logan Road' },
    { locality: 'Eight Mile Plains' },
    { region: 'QLD' }, { postcode: '4113' }
  ])

  assertFirstMatch('1 Queen Street, Brisbane 4000', [
    { housenumber: '1' }, { street: 'Queen Street' },
    { locality: 'Brisbane' }, { postcode: '4000' }
  ])

  assertFirstMatch('754 Robinson Rd West, Aspley, QLD 4035', [
    { housenumber: '754' }, { street: 'Robinson Rd West' },
    { locality: 'Aspley' }, { region: 'QLD' }, { postcode: '4035' }
  ])

  assertFirstMatch('Sydney 2000', [
    { locality: 'Sydney' }, { postcode: '2000' }
  ])

  assertFirstMatch('Perth', [{ locality: 'Perth' }])

  assertFirstMatch('1/135 Ferny Way, Ferny Grove 4054', [
    { housenumber: '1/135' }, { street: 'Ferny Way' },
    { locality: 'Ferny Grove' }, { postcode: '4054' }
  ])

  assertFirstMatch('Eight Mile Plains 4113', [
    { locality: 'Eight Mile Plains' }, { postcode: '4113' }
  ])

  assertFirstMatch('8/437 St Kilda Road Melbourne, VIC ', [
    { housenumber: '8/437' }, { street: 'St Kilda Road' },
    { locality: 'Melbourne' }, { region: 'VIC' }
  ])

  assertFirstMatch('BOOM', [{ locality: 'BOOM' }])

  assertFirstMatch('Eight Mile Plains 9999', [
    { locality: 'Eight Mile Plains' }, { postcode: '9999' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`addressit AUS: ${name}`, testFunction)
  }

  testcase(test, common)
}
