const AddressParser = require('../parser/AddressParser')

const testcase = (test, common) => {
  let parser = new AddressParser()
  let assert = common.assert.bind(null, test, parser)

  assert('Martin Luther King Jr. Blvd.', [
    { street: 'Martin Luther King Jr. Blvd.' }
  ], true)

  assert('Martin Luther King Blvd.', [
    { street: 'Martin Luther King Blvd.' }
  ], true)

  assert('1900 SE A ST, SAN FRANCISCO', [
    { housenumber: '1900' }, { street: 'SE A ST' },
    { locality: 'SAN FRANCISCO' }
  ], true)

  assert('1900 SE F ST, SAN FRANCISCO', [
    { housenumber: '1900' }, { street: 'SE F ST' },
    { locality: 'SAN FRANCISCO' }
  ], true)

  // postcode allowed in first position when only 1 token
  assert('90210', [{ postcode: '90210' }], true)

  // postcode allowed in first position when only 1 token in section
  assert('90210, CA', [{ postcode: '90210' }, { region: 'CA' }], true)

  // postcode not allowed in first position otherwise
  assert('90210 Foo', [])

  // autocomplete street name jitter
  // note: we are only testing the street name stays the same throughout
  assert('N FISKE AVE', [{ street: 'N FISKE AVE' }], true)
  assert('N FISKE AVE P', [{ street: 'N FISKE AVE' }], true)
  assert('N FISKE AVE Po', [{ street: 'N FISKE AVE' }, { region: 'Po' }], true)
  assert('N FISKE AVE Por', [{ street: 'N FISKE AVE' }, { region: 'Por' }], true)
  assert('N FISKE AVE Port', [{ street: 'N FISKE AVE' }, { locality: 'Port' }], true)
  assert('N FISKE AVE Portl', [{ street: 'N FISKE AVE' }], true)
  assert('N FISKE AVE Portla', [{ street: 'N FISKE AVE' }], true)
  assert('N FISKE AVE Portlan', [{ street: 'N FISKE AVE' }], true)
  assert('N FISKE AVE Portland', [{ street: 'N FISKE AVE' }, { locality: 'Portland' }], true)
  assert('N DWIGHT AVE Portland O', [{ street: 'N DWIGHT AVE' }, { locality: 'Portland' }], true)
  assert('N DWIGHT AVE Portland Or', [{ street: 'N DWIGHT AVE' }, { locality: 'Portland' }, { region: 'Or' }], true)
  assert('N DWIGHT AVE Portland Ore', [{ street: 'N DWIGHT AVE' }, { locality: 'Portland' }], true)
  assert('N DWIGHT AVE Portland Oreg', [{ street: 'N DWIGHT AVE' }, { locality: 'Portland' }], true)
  assert('N DWIGHT AVE Portland Orego', [{ street: 'N DWIGHT AVE' }, { locality: 'Portland' }], true)
  assert('N DWIGHT AVE Portland Oregon', [{ street: 'N DWIGHT AVE' }, { locality: 'Portland' }, { region: 'Oregon' }], true)
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`USA: ${name}`, testFunction)
  }

  testcase(test, common)
}
