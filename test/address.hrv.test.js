const testcase = (test, common) => {
  let assertFirstMatch = common.assertFirstMatch(test)

  assertFirstMatch('Zadarska 17, Pula', [
    { street: 'Zadarska' }, { housenumber: '17' },
    { locality: 'Pula' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address HRV: ${name}`, testFunction)
  }

  testcase(test, common)
}
