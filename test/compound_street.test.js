const testcase = (test, common) => {
  let assertFirstParseMatches = common.assertFirstParseMatches(test)

  // street simple
  assertFirstParseMatches('Foostraße', [{ street: 'Foostraße' }])

  // should not attach a second suffix
  assertFirstParseMatches('Foostraße Rd', [{ street: 'Foostraße' }])
  assertFirstParseMatches('foo st and', [{ street: 'foo st' }])

  // address simple
  assertFirstParseMatches('Foostraße 1', [
    { street: 'Foostraße' }, { housenumber: '1' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`compound_street: ${name}`, testFunction)
  }

  testcase(test, common)
}
