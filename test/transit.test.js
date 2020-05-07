const testcase = (test, common) => {
  let assertFirstMatch = common.assertFirstMatch(test)

  assertFirstMatch('Stop 1', [
    { place: 'Stop 1' }
  ])

  assertFirstMatch('Stop 10010', [
    { place: 'Stop 10010' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`Transit: ${name}`, testFunction)
  }

  testcase(test, common)
}
