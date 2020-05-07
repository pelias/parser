const testcase = (test, common) => {
  let assertFirstParseMatches = common.assertFirstParseMatches(test)

  assertFirstParseMatches('6000, NSW, Australia', [
    { postcode: '6000' },
    { region: 'NSW' }, { country: 'Australia' }
  ])

  assertFirstParseMatches('Unit 12/345 Main St', [
    { unit_type: 'Unit' }, { unit: '12' },
    { housenumber: '345' },
    { street: 'Main St' }
  ])

  assertFirstParseMatches('U 12 345 Main St', [
    { unit_type: 'U' }, { unit: '12' },
    { housenumber: '345' },
    { street: 'Main St' }
  ])

  assertFirstParseMatches('Apartment 12/345 Main St', [
    { unit_type: 'Apartment' }, { unit: '12' },
    { housenumber: '345' },
    { street: 'Main St' }
  ])

  assertFirstParseMatches('Apt 12/345 Main St', [
    { unit_type: 'Apt' }, { unit: '12' },
    { housenumber: '345' },
    { street: 'Main St' }
  ])

  assertFirstParseMatches('Lot 12/345 Main St', [
    { unit_type: 'Lot' }, { unit: '12' },
    { housenumber: '345' },
    { street: 'Main St' }
  ])

  assertFirstParseMatches('U12/345 Main St', [
    { unit_type: 'U' }, { unit: '12' },
    { housenumber: '345' },
    { street: 'Main St' }
  ])

  assertFirstParseMatches('Lot 12/345 Illawarra Road Marrickville NSW 2204', [
    { unit_type: 'Lot' }, { unit: '12' }, { housenumber: '345' },
    { street: 'Illawarra Road' }, { locality: 'Marrickville' },
    { region: 'NSW' }, { postcode: '2204' }
  ])

  assertFirstParseMatches('Lot 2, Burrows Avenue, EDMONDSON PARK, NSW, Australia', [
    { unit_type: 'Lot' }, { unit: '2' },
    { street: 'Burrows Avenue' }, { locality: 'EDMONDSON PARK' },
    { region: 'NSW' }, { country: 'Australia' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address AUS: ${name}`, testFunction)
  }

  testcase(test, common)
}
