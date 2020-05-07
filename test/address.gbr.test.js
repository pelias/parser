const testcase = (test, common) => {
  let assertFirstParseMatches = common.assertFirstParseMatches(test)

  assertFirstParseMatches('Rushendon Furlong', [
    { street: 'Rushendon Furlong' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address GBR: ${name}`, testFunction)
  }

  testcase(test, common)
}
