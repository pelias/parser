const testcase = (test, common) => {
  let assertFirstSolution = common.assertFirstSolution(test)

  assertFirstSolution('6000, NSW, Australia', [
    { postcode: '6000' },
    { region: 'NSW' }, { country: 'Australia' }
  ])

  assertFirstSolution('Unit 12/345 Main St', [
    { unit_type: 'Unit' }, { unit: '12' },
    { housenumber: '345' },
    { street: 'Main St' }
  ])

  assertFirstSolution('U 12 345 Main St', [
    { unit_type: 'U' }, { unit: '12' },
    { housenumber: '345' },
    { street: 'Main St' }
  ])

  assertFirstSolution('Apartment 12/345 Main St', [
    { unit_type: 'Apartment' }, { unit: '12' },
    { housenumber: '345' },
    { street: 'Main St' }
  ])

  assertFirstSolution('Apt 12/345 Main St', [
    { unit_type: 'Apt' }, { unit: '12' },
    { housenumber: '345' },
    { street: 'Main St' }
  ])

  assertFirstSolution('Lot 12/345 Main St', [
    { unit_type: 'Lot' }, { unit: '12' },
    { housenumber: '345' },
    { street: 'Main St' }
  ])

  assertFirstSolution('U12/345 Main St', [
    { unit_type: 'U' }, { unit: '12' },
    { housenumber: '345' },
    { street: 'Main St' }
  ])

  assertFirstSolution('Lot 12/345 Illawarra Road Marrickville NSW 2204', [
    { unit_type: 'Lot' }, { unit: '12' }, { housenumber: '345' },
    { street: 'Illawarra Road' }, { locality: 'Marrickville' },
    { region: 'NSW' }, { postcode: '2204' }
  ])

  assertFirstSolution('Lot 2, Burrows Avenue, EDMONDSON PARK, NSW, Australia', [
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
