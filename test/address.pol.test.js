const testcase = (test, common) => {
  let assertFirstParseMatches = common.assertFirstParseMatches(test)

  assertFirstParseMatches('Szewska 6, Kraków', [
    { street: 'Szewska' }, { housenumber: '6' },
    { locality: 'Kraków' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address POL: ${name}`, testFunction)
  }

  testcase(test, common)
}
