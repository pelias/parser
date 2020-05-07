const testcase = (test, common) => {
  let assertFirstMatch = common.assertFirstMatch(test)

  assertFirstMatch('Julianastraat, Heel', [
    { street: 'Julianastraat' }, { locality: 'Heel' }
  ])

  assertFirstMatch('Lindenlaan, Sint Odilienberg', [
    { street: 'Lindenlaan' }, { locality: 'Sint Odilienberg' }
  ])

  assertFirstMatch('Bosserdijk, Hoogland', [
    { street: 'Bosserdijk' }, { locality: 'Hoogland' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address NLD: ${name}`, testFunction)
  }

  testcase(test, common)
}
