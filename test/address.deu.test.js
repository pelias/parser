const testcase = (test, common) => {
  let assert = common.assert(test)

  assert('Am Falkpl. 5, 10437 Berlin', [
    { street: 'Am Falkpl.' }, { housenumber: '5' },
    { postcode: '10437' }, { locality: 'Berlin' }
  ])

  assert('Am Bürgerpark 15-18, 13156, Berlin', [
    { street: 'Am Bürgerpark' }, { housenumber: '15-18' },
    { postcode: '13156' }, { locality: 'Berlin' }
  ])

  assert('Kaschk Bar, Linienstraße 40 10119 Berlin', [
    { place: 'Kaschk Bar' },
    { street: 'Linienstraße' }, { housenumber: '40' },
    { postcode: '10119' }, { locality: 'Berlin' }
  ])

  assert('Genter Straße 16a, Munich, Germany', [
    { street: 'Genter Straße' }, { housenumber: '16a' },
    { locality: 'Munich' }, { country: 'Germany' }
  ])

  // autocomplete-style query includes partial postcode
  assert('Eberswalder Straße 100 104', [
    { street: 'Eberswalder Straße' }, { housenumber: '100' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address DEU: ${name}`, testFunction)
  }

  testcase(test, common)
}
