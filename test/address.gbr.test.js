const testcase = (test, common) => {
  let assert = common.assert(test)

  assert('Rushendon Furlong', [
    { street: 'Rushendon Furlong' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address GBR: ${name}`, testFunction)
  }

  testcase(test, common)
}
