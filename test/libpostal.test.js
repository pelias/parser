// test cases from libpostal
// https://github.com/openvenues/libpostal/issues

const testcase = (test, common) => {
  let assertFirstParseMatches = common.assertFirstParseMatches(test)

  // https://github.com/openvenues/libpostal/issues/382
  assertFirstParseMatches('3360 Grand Ave Oakland 94610-2737 CA', [
    { housenumber: '3360' }, { street: 'Grand Ave' },
    { locality: 'Oakland' }, { postcode: '94610-2737' },
    { region: 'CA' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`functional: ${name}`, testFunction)
  }

  testcase(test, common)
}
