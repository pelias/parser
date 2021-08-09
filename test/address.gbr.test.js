const testcase = (test, common) => {
  let assert = common.assert(test)

  assert('Rushendon Furlong', [
    { street: 'Rushendon Furlong' }
  ])

  // Valid street name in London
  assert('Broadway Market, London', [
    { street: 'Broadway Market' },
    { locality: 'London' }
  ])

  // 'The Dove', a pub on Broadway Market
  assert('24-28 Broadway Market, London', [
    { housenumber: '24-28' },
    { street: 'Broadway Market' },
    { locality: 'London' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address GBR: ${name}`, testFunction)
  }

  testcase(test, common)
}
