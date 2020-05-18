const testcase = (test, common) => {
  let assertFirstSolution = common.assertFirstSolution(test)

  assertFirstSolution('Rushendon Furlong', [
    { street: 'Rushendon Furlong' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address GBR: ${name}`, testFunction)
  }

  testcase(test, common)
}
