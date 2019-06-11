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

  assert('University of Hawaii at Hilo', [
    { place: 'University of Hawaii' }, { street: 'Hilo' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`USA: ${name}`, testFunction)
  }

  testcase(test, common)
}
