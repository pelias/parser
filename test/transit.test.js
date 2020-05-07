const testcase = (test, common) => {
  let assertFirstParseMatches = common.assertFirstParseMatches(test)

  assertFirstParseMatches('Stop 1', [
    { place: 'Stop 1' }
  ])

  assertFirstParseMatches('Stop 10010', [
    { place: 'Stop 10010' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`Transit: ${name}`, testFunction)
  }

  testcase(test, common)
}
