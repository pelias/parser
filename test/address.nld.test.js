const testcase = (test, common) => {
  let assert = common.assert(test)

  assert('Julianastraat, Heel', [
    { street: 'Julianastraat' }, { locality: 'Heel' }
  ], true)

  assert('Lindenlaan, Sint Odilienberg', [
    { street: 'Lindenlaan' }, { locality: 'Sint Odilienberg' }
  ], true)

  assert('Bosserdijk, Hoogland', [
    { street: 'Bosserdijk' }, { locality: 'Hoogland' }
  ], true)
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address NLD: ${name}`, testFunction)
  }

  testcase(test, common)
}
