const testcase = (test, common) => {
  let assertFirstMatch = common.assertFirstMatch(test)

  // street simple
  assertFirstMatch('Foostraße', [{ street: 'Foostraße' }])

  // should not attach a second suffix
  assertFirstMatch('Foostraße Rd', [{ street: 'Foostraße' }])
  assertFirstMatch('foo st and', [{ street: 'foo st' }])

  // address simple
  assertFirstMatch('Foostraße 1', [
    { street: 'Foostraße' }, { housenumber: '1' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`compound_street: ${name}`, testFunction)
  }

  testcase(test, common)
}
