const testcase = (test, common) => {
  let assert = common.assert(test)

  assert('Am Falkpl. 5, 10437 Berlin', [
    { street: 'Am Falkpl.' }, { housenumber: '5' },
    { postcode: '10437' }, { locality: 'Berlin' }
  ])

  assert('Am Nordkanal 11, 47877 Willich', [
    { street: 'Am Nordkanal' }, { housenumber: '11' },
    { postcode: '47877' }, { locality: 'Willich' }
  ])

  assert('Am Bürgerpark 15-18, 13156, Berlin', [
    { street: 'Am Bürgerpark' }, { housenumber: '15-18' },
    { postcode: '13156' }, { locality: 'Berlin' }
  ])

  assert('Kaschk Bar, Linienstraße 40 10119 Berlin', [
    { venue: 'Kaschk Bar' },
    { street: 'Linienstraße' }, { housenumber: '40' },
    { postcode: '10119' }, { locality: 'Berlin' }
  ])

  assert('Genter Straße 16a, Munich, Germany', [
    { street: 'Genter Straße' }, { housenumber: '16a' },
    { locality: 'Munich' }, { country: 'Germany' }
  ])

  assert('Esplanade, Berlin', [
    { street: 'Esplanade' },
    { locality: 'Berlin' }
  ])

  assert('Esplanade 17, Berlin', [
    { street: 'Esplanade' }, { housenumber: '17' },
    { locality: 'Berlin' }
  ])

  assert('17 Esplanade, Berlin', [
    { housenumber: '17' }, { street: 'Esplanade' },
    { locality: 'Berlin' }
  ])

  assert('Königsallee Düsseldorf', [
    { street: 'Königsallee' },
    { locality: 'Düsseldorf' }
  ])

  assert('Rathausplatz', [{ street: 'Rathausplatz' }])
  assert('Plutoweg', [{ street: 'Plutoweg' }])
  assert('Dorfstrasse', [{ street: 'Dorfstrasse' }])

  // autocomplete-style query includes partial postcode
  assert('Eberswalder Straße 100 104', [
    { street: 'Eberswalder Straße' }, { housenumber: '100' }
  ])

  // addresses on numbered streets in europe
  assert('25 Straße 50', [
    { street: '25 Straße' }, { housenumber: '50' }
  ])
  assert('25 Straße, 50', [
    { street: '25 Straße' }, { housenumber: '50' }
  ])
  assert('25 Strada 50', [
    { street: '25 Strada' }, { housenumber: '50' }
  ])
  assert('25 Strada, 50', [
    { street: '25 Strada' }, { housenumber: '50' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address DEU: ${name}`, testFunction)
  }

  testcase(test, common)
}
