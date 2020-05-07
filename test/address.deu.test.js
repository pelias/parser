const testcase = (test, common) => {
  let assertFirstParseMatches = common.assertFirstParseMatches(test)

  assertFirstParseMatches('Am Falkpl. 5, 10437 Berlin', [
    { street: 'Am Falkpl.' }, { housenumber: '5' },
    { postcode: '10437' }, { locality: 'Berlin' }
  ])

  assertFirstParseMatches('Am Nordkanal 11, 47877 Willich', [
    { street: 'Am Nordkanal' }, { housenumber: '11' },
    { postcode: '47877' }, { locality: 'Willich' }
  ])

  assertFirstParseMatches('Am Bürgerpark 15-18, 13156, Berlin', [
    { street: 'Am Bürgerpark' }, { housenumber: '15-18' },
    { postcode: '13156' }, { locality: 'Berlin' }
  ])

  assertFirstParseMatches('Kaschk Bar, Linienstraße 40 10119 Berlin', [
    { place: 'Kaschk Bar' },
    { street: 'Linienstraße' }, { housenumber: '40' },
    { postcode: '10119' }, { locality: 'Berlin' }
  ])

  assertFirstParseMatches('Genter Straße 16a, Munich, Germany', [
    { street: 'Genter Straße' }, { housenumber: '16a' },
    { locality: 'Munich' }, { country: 'Germany' }
  ])

  assertFirstParseMatches('Esplanade 17, Berlin', [
    { street: 'Esplanade' }, { housenumber: '17' },
    { locality: 'Berlin' }
  ])

  assertFirstParseMatches('Königsallee Düsseldorf', [
    { street: 'Königsallee' },
    { locality: 'Düsseldorf' }
  ])

  assertFirstParseMatches('Rathausplatz', [{ street: 'Rathausplatz' }])
  assertFirstParseMatches('Plutoweg', [{ street: 'Plutoweg' }])
  assertFirstParseMatches('Dorfstrasse', [{ street: 'Dorfstrasse' }])

  // autocomplete-style query includes partial postcode
  assertFirstParseMatches('Eberswalder Straße 100 104', [
    { street: 'Eberswalder Straße' }, { housenumber: '100' }
  ])

  // addresses on numbered streets in europe
  assertFirstParseMatches('25 Straße 50', [
    { street: '25 Straße' }, { housenumber: '50' }
  ])
  assertFirstParseMatches('25 Straße, 50', [
    { street: '25 Straße' }, { housenumber: '50' }
  ])
  assertFirstParseMatches('25 Strada 50', [
    { street: '25 Strada' }, { housenumber: '50' }
  ])
  assertFirstParseMatches('25 Strada, 50', [
    { street: '25 Strada' }, { housenumber: '50' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address DEU: ${name}`, testFunction)
  }

  testcase(test, common)
}
