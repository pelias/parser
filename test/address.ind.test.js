const testcase = (test, common) => {
  let assertFirstMatch = common.assertFirstMatch(test)

  assertFirstMatch('100, Mahalakshmi Rd, Ganesh Nagar, Kirti Nagar, New Sanghavi, Pimpri-Chinchwad, Maharashtra 411027', [
    { housenumber: '100' }, { street: 'Mahalakshmi Rd' },
    { locality: 'Pimpri-Chinchwad' }, { region: 'Maharashtra' },
    { postcode: '411027' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address IND: ${name}`, testFunction)
  }

  testcase(test, common)
}
