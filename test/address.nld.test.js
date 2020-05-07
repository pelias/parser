const testcase = (test, common) => {
  let assertFirstParseMatches = common.assertFirstParseMatches(test)

  assertFirstParseMatches('Julianastraat, Heel', [
    { street: 'Julianastraat' }, { locality: 'Heel' }
  ])

  assertFirstParseMatches('Lindenlaan, Sint Odilienberg', [
    { street: 'Lindenlaan' }, { locality: 'Sint Odilienberg' }
  ])

  assertFirstParseMatches('Bosserdijk, Hoogland', [
    { street: 'Bosserdijk' }, { locality: 'Hoogland' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address NLD: ${name}`, testFunction)
  }

  testcase(test, common)
}
