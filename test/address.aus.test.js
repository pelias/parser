const testcase = (test, common) => {
  let assert = common.assert(test)

  assert('6000, NSW, Australia', [
    { postcode: '6000' },
    { region: 'NSW' }, { country: 'Australia' }
  ])

  assert('Unit 12/345 Main St', [
    { unit_type: 'Unit' }, { unit: '12' },
    { housenumber: '345' },
    { street: 'Main St' }
  ])

  assert('U 12 345 Main St', [
    { unit_type: 'U' }, { unit: '12' },
    { housenumber: '345' },
    { street: 'Main St' }
  ])

  assert('Apartment 12/345 Main St', [
    { unit_type: 'Apartment' }, { unit: '12' },
    { housenumber: '345' },
    { street: 'Main St' }
  ])

  assert('Apt 12/345 Main St', [
    { unit_type: 'Apt' }, { unit: '12' },
    { housenumber: '345' },
    { street: 'Main St' }
  ])

  assert('Lot 12/345 Main St', [
    { unit_type: 'Lot' }, { unit: '12' },
    { housenumber: '345' },
    { street: 'Main St' }
  ])

  assert('U12/345 Main St', [
    { unit_type: 'U' }, { unit: '12' },
    { housenumber: '345' },
    { street: 'Main St' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address AUS: ${name}`, testFunction)
  }

  testcase(test, common)
}
