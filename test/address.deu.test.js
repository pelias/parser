const testcase = (test, common) => {
  let assertFirstMatch = common.assertFirstMatch(test)

  assertFirstMatch('Am Falkpl. 5, 10437 Berlin', [
    { street: 'Am Falkpl.' }, { housenumber: '5' },
    { postcode: '10437' }, { locality: 'Berlin' }
  ])

  assertFirstMatch('Am Nordkanal 11, 47877 Willich', [
    { street: 'Am Nordkanal' }, { housenumber: '11' },
    { postcode: '47877' }, { locality: 'Willich' }
  ])

  assertFirstMatch('Am Bürgerpark 15-18, 13156, Berlin', [
    { street: 'Am Bürgerpark' }, { housenumber: '15-18' },
    { postcode: '13156' }, { locality: 'Berlin' }
  ])

  assertFirstMatch('Kaschk Bar, Linienstraße 40 10119 Berlin', [
    { place: 'Kaschk Bar' },
    { street: 'Linienstraße' }, { housenumber: '40' },
    { postcode: '10119' }, { locality: 'Berlin' }
  ])

  assertFirstMatch('Genter Straße 16a, Munich, Germany', [
    { street: 'Genter Straße' }, { housenumber: '16a' },
    { locality: 'Munich' }, { country: 'Germany' }
  ])

  assertFirstMatch('Esplanade 17, Berlin', [
    { street: 'Esplanade' }, { housenumber: '17' },
    { locality: 'Berlin' }
  ])

  assertFirstMatch('Königsallee Düsseldorf', [
    { street: 'Königsallee' },
    { locality: 'Düsseldorf' }
  ])

  assertFirstMatch('Rathausplatz', [{ street: 'Rathausplatz' }])
  assertFirstMatch('Plutoweg', [{ street: 'Plutoweg' }])
  assertFirstMatch('Dorfstrasse', [{ street: 'Dorfstrasse' }])

  // autocomplete-style query includes partial postcode
  assertFirstMatch('Eberswalder Straße 100 104', [
    { street: 'Eberswalder Straße' }, { housenumber: '100' }
  ])

  // addresses on numbered streets in europe
  assertFirstMatch('25 Straße 50', [
    { street: '25 Straße' }, { housenumber: '50' }
  ])
  assertFirstMatch('25 Straße, 50', [
    { street: '25 Straße' }, { housenumber: '50' }
  ])
  assertFirstMatch('25 Strada 50', [
    { street: '25 Strada' }, { housenumber: '50' }
  ])
  assertFirstMatch('25 Strada, 50', [
    { street: '25 Strada' }, { housenumber: '50' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address DEU: ${name}`, testFunction)
  }

  testcase(test, common)
}
