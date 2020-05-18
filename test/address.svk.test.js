const testcase = (test, common) => {
  let assertFirstSolution = common.assertFirstSolution(test)

  assertFirstSolution('Divadelná 41/3, Trnava', [
    { street: 'Divadelná' }, { housenumber: '41/3' },
    { locality: 'Trnava' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address SVK: ${name}`, testFunction)
  }

  testcase(test, common)
}
