// tests copied from 'npm addressit'
// https://github.com/DamonOehlman/addressit/tree/master/test

const testcase = (test, common) => {
  let assertFirstParseMatches = common.assertFirstParseMatches(test)

  assertFirstParseMatches('123 Main St, New York, NY 10010', [
    { housenumber: '123' }, { street: 'Main St' },
    { locality: 'New York' }, { region: 'NY' },
    { postcode: '10010' }
  ])

  assertFirstParseMatches('123 Main St New York, NY 10010', [
    { housenumber: '123' }, { street: 'Main St' },
    { locality: 'New York' }, { region: 'NY' },
    { postcode: '10010' }
  ])

  assertFirstParseMatches('123 Main St New York NY 10010', [
    { housenumber: '123' }, { street: 'Main St' },
    { locality: 'New York' }, { region: 'NY' },
    { postcode: '10010' }
  ])

  assertFirstParseMatches('123 E 21st st, Brooklyn NY 11020', [
    { housenumber: '123' }, { street: 'E 21st st' },
    { locality: 'Brooklyn' }, { region: 'NY' },
    { postcode: '11020' }
  ])

  assertFirstParseMatches('754 Pharr Rd, Atlanta, Georgia 31035', [
    { housenumber: '754' }, { street: 'Pharr Rd' },
    { locality: 'Atlanta' }, { region: 'Georgia' },
    { postcode: '31035' }
  ])

  assertFirstParseMatches('601 21st Ave N, Myrtle Beach, South Carolina 29577', [
    { housenumber: '601' }, { street: '21st Ave N' },
    { locality: 'Myrtle Beach' }, { region: 'South Carolina' },
    { postcode: '29577' }
  ])

  assertFirstParseMatches('425 W 23rd St, New York, NY 10011', [
    { housenumber: '425' }, { street: 'W 23rd St' },
    { locality: 'New York' }, { region: 'NY' }, { postcode: '10011' }
  ])

  assertFirstParseMatches('1035 Comanchee Trl, West Columbia, South Carolina 29169', [
    { housenumber: '1035' }, { street: 'Comanchee Trl' },
    { locality: 'West Columbia' }, { region: 'South Carolina' },
    { postcode: '29169' }
  ])

  assertFirstParseMatches('Texas 76013', [{ region: 'Texas' }, { postcode: '76013' }])

  assertFirstParseMatches('Dallas', [{ locality: 'Dallas' }])

  assertFirstParseMatches('California', [{ region: 'California' }])

  assertFirstParseMatches('New York', [{ locality: 'New York' }])

  assertFirstParseMatches('New York, NY', [{ locality: 'New York' }, { region: 'NY' }])

  assertFirstParseMatches('New York, New York', [
    { locality: 'New York' }, { region: 'New York' }
  ])

  // assertFirstParseMatches('northern mariana islands', [])

  assertFirstParseMatches('Santa Monica, California 90407', [
    { locality: 'Santa Monica' }, { region: 'California' }, { postcode: '90407' }
  ])

  assertFirstParseMatches('Grand canyon 86023', [
    { locality: 'Grand canyon' }, { postcode: '86023' }
  ])

  assertFirstParseMatches('CT, 06410', [{ region: 'CT' }, { postcode: '06410' }])

  assertFirstParseMatches('BOOM', [{ locality: 'BOOM' }])

  assertFirstParseMatches('Niagara Falls 76B09', [
    { locality: 'Niagara Falls' }
  ])

  // assertFirstParseMatches('123 Broadway, New York, NY 10010', [
  //   { street: '123 Broadway' }, { locality: 'New York' }, { region: 'NY' }, { postcode: '10010' }
  // ])

  assertFirstParseMatches('Mt Tabor Park, 6220 SE Salmon St, Portland, OR 97215, USA', [
    { place: 'Mt Tabor Park' },
    { housenumber: '6220' }, { street: 'SE Salmon St' },
    { locality: 'Portland' }, { region: 'OR' },
    { postcode: '97215' }, { country: 'USA' }
  ])

  // assertFirstParseMatches('Mt Tabor Park', [])

  assertFirstParseMatches('Mt', [{ region: 'Mt' }])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`addressit USA: ${name}`, testFunction)
  }

  testcase(test, common)
}
