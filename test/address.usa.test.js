const testcase = (test, common) => {
  let assert = common.assert(test)

  assert('Martin Luther King Jr. Blvd.', [
    { street: 'Martin Luther King Jr. Blvd.' }
  ])

  assert('Martin Luther King Blvd.', [
    { street: 'Martin Luther King Blvd.' }
  ])

  assert('1900 SE A ST, SAN FRANCISCO', [
    { housenumber: '1900' }, { street: 'SE A ST' },
    { locality: 'SAN FRANCISCO' }
  ])

  assert('1900 SE F ST, SAN FRANCISCO', [
    { housenumber: '1900' }, { street: 'SE F ST' },
    { locality: 'SAN FRANCISCO' }
  ])

  assert('22024 main st, ca', [
    { housenumber: '22024' }, { street: 'main st' },
    { region: 'ca' }
  ])

  // postcode allowed in first position when only 1 token
  assert('90210', [{ postcode: '90210' }])

  // postcode allowed in first position when only 1 token in section
  assert('90210, CA', [{ postcode: '90210' }, { region: 'CA' }])

  // postcode not allowed in first position otherwise
  assert('90210 Foo', [], false)

  // autocomplete street name jitter
  // note: we are only testing the street name stays the same throughout
  assert('N FISKE AVE', [{ street: 'N FISKE AVE' }])
  assert('N FISKE AVE P', [{ street: 'N FISKE AVE' }])
  assert('N FISKE AVE Po', [{ street: 'N FISKE AVE' }, { region: 'Po' }])
  assert('N FISKE AVE Por', [{ street: 'N FISKE AVE' }, { region: 'Por' }])
  assert('N FISKE AVE Port', [{ street: 'N FISKE AVE' }, { locality: 'Port' }])
  assert('N FISKE AVE Portl', [{ street: 'N FISKE AVE' }])
  assert('N FISKE AVE Portla', [{ street: 'N FISKE AVE' }])
  assert('N FISKE AVE Portlan', [{ street: 'N FISKE AVE' }])
  assert('N FISKE AVE Portland', [{ street: 'N FISKE AVE' }, { locality: 'Portland' }])
  assert('N DWIGHT AVE Portland O', [{ street: 'N DWIGHT AVE' }, { locality: 'Portland' }])
  assert('N DWIGHT AVE Portland Or', [{ street: 'N DWIGHT AVE' }, { locality: 'Portland' }, { region: 'Or' }])
  assert('N DWIGHT AVE Portland Ore', [{ street: 'N DWIGHT AVE' }, { locality: 'Portland' }])
  assert('N DWIGHT AVE Portland Oreg', [{ street: 'N DWIGHT AVE' }, { locality: 'Portland' }])
  assert('N DWIGHT AVE Portland Orego', [{ street: 'N DWIGHT AVE' }, { locality: 'Portland' }])
  assert('N DWIGHT AVE Portland Oregon', [{ street: 'N DWIGHT AVE' }, { locality: 'Portland' }, { region: 'Oregon' }])

  assert('University of Hawaii', [{ place: 'University of Hawaii' }])

  // Maybe one day this test will pass...
  // see: https://github.com/pelias/parser/pull/49
  // assert('University of Hawaii at Hilo', [
  //   { place: 'University of Hawaii at Hilo' }
  // ])

  assert('Highway 72', [{ street: 'Highway 72' }], true)
  assert('1210a Highway 10 W IA', [{ housenumber: '1210a' }, { street: 'Highway 10 W' }, { region: 'IA' }], true)
  assert('1210a State Highway 10', [{ housenumber: '1210a' }, { street: 'State Highway 10' }], true)
  assert('1389a County Road 42 IA', [{ housenumber: '1389a' }, { street: 'County Road 42' }, { region: 'IA' }], true)
  assert('CA 72', [{ street: 'CA 72' }], true)
  assert('1210a IA 10 W IA', [{ housenumber: '1210a' }, { street: 'IA 10 W' }, { region: 'IA' }], true)
  assert('1210a California 10', [{ housenumber: '1210a' }, { street: 'California 10' }], true)
  assert('1389a IA 42 IA', [{ housenumber: '1389a' }, { street: 'IA 42' }, { region: 'IA' }], true)

  assert('1111 MD 760, Lusby, MD, USA', [{ housenumber: '1111' }, { street: 'MD 760' }, { locality: 'Lusby' }, { region: 'MD' }, { country: 'USA' }], true)
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`USA: ${name}`, testFunction)
  }

  testcase(test, common)
}
