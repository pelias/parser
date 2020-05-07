// tests copied from 'npm addressit'
// https://github.com/DamonOehlman/addressit/tree/master/test

const testcase = (test, common) => {
  let assertFirstMatch = common.assertFirstMatch(test)

  assertFirstMatch('123 Main St, New York, NY 10010', [
    { housenumber: '123' }, { street: 'Main St' },
    { locality: 'New York' }, { region: 'NY' },
    { postcode: '10010' }
  ])

  assertFirstMatch('123 Main St New York, NY 10010', [
    { housenumber: '123' }, { street: 'Main St' },
    { locality: 'New York' }, { region: 'NY' },
    { postcode: '10010' }
  ])

  assertFirstMatch('123 Main St New York NY 10010', [
    { housenumber: '123' }, { street: 'Main St' },
    { locality: 'New York' }, { region: 'NY' },
    { postcode: '10010' }
  ])

  assertFirstMatch('123 E 21st st, Brooklyn NY 11020', [
    { housenumber: '123' }, { street: 'E 21st st' },
    { locality: 'Brooklyn' }, { region: 'NY' },
    { postcode: '11020' }
  ])

  assertFirstMatch('754 Pharr Rd, Atlanta, Georgia 31035', [
    { housenumber: '754' }, { street: 'Pharr Rd' },
    { locality: 'Atlanta' }, { region: 'Georgia' },
    { postcode: '31035' }
  ])

  assertFirstMatch('601 21st Ave N, Myrtle Beach, South Carolina 29577', [
    { housenumber: '601' }, { street: '21st Ave N' },
    { locality: 'Myrtle Beach' }, { region: 'South Carolina' },
    { postcode: '29577' }
  ])

  assertFirstMatch('425 W 23rd St, New York, NY 10011', [
    { housenumber: '425' }, { street: 'W 23rd St' },
    { locality: 'New York' }, { region: 'NY' }, { postcode: '10011' }
  ])

  assertFirstMatch('1035 Comanchee Trl, West Columbia, South Carolina 29169', [
    { housenumber: '1035' }, { street: 'Comanchee Trl' },
    { locality: 'West Columbia' }, { region: 'South Carolina' },
    { postcode: '29169' }
  ])

  assertFirstMatch('Texas 76013', [{ region: 'Texas' }, { postcode: '76013' }])

  assertFirstMatch('Dallas', [{ locality: 'Dallas' }])

  assertFirstMatch('California', [{ region: 'California' }])

  assertFirstMatch('New York', [{ locality: 'New York' }])

  assertFirstMatch('New York, NY', [{ locality: 'New York' }, { region: 'NY' }])

  assertFirstMatch('New York, New York', [
    { locality: 'New York' }, { region: 'New York' }
  ])

  // assertFirstMatch('northern mariana islands', [])

  assertFirstMatch('Santa Monica, California 90407', [
    { locality: 'Santa Monica' }, { region: 'California' }, { postcode: '90407' }
  ])

  assertFirstMatch('Grand canyon 86023', [
    { locality: 'Grand canyon' }, { postcode: '86023' }
  ])

  assertFirstMatch('CT, 06410', [{ region: 'CT' }, { postcode: '06410' }])

  assertFirstMatch('BOOM', [{ locality: 'BOOM' }])

  assertFirstMatch('Niagara Falls 76B09', [
    { locality: 'Niagara Falls' }
  ])

  // assertFirstMatch('123 Broadway, New York, NY 10010', [
  //   { street: '123 Broadway' }, { locality: 'New York' }, { region: 'NY' }, { postcode: '10010' }
  // ])

  assertFirstMatch('Mt Tabor Park, 6220 SE Salmon St, Portland, OR 97215, USA', [
    { place: 'Mt Tabor Park' },
    { housenumber: '6220' }, { street: 'SE Salmon St' },
    { locality: 'Portland' }, { region: 'OR' },
    { postcode: '97215' }, { country: 'USA' }
  ])

  // assertFirstMatch('Mt Tabor Park', [])

  assertFirstMatch('Mt', [{ region: 'Mt' }])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`addressit USA: ${name}`, testFunction)
  }

  testcase(test, common)
}
