const testcase = (test, common) => {
  let assertFirstSolution = common.assertFirstSolution(test)

  // street simple
  assertFirstSolution('Foostraße', [{ street: 'Foostraße' }])

  // should not attach a second suffix
  assertFirstSolution('Foostraße Rd', [{ street: 'Foostraße' }])
  assertFirstSolution('foo st and', [{ street: 'foo st' }])

  // address simple
  assertFirstSolution('Foostraße 1', [
    { street: 'Foostraße' }, { housenumber: '1' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`compound_street: ${name}`, testFunction)
  }

  testcase(test, common)
}
