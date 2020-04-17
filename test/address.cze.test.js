const testcase = (test, common) => {
  let assert = common.assert(test)

  assert('Korunní 810, Praha', [
    { street: 'Korunní' }, { housenumber: '810' },
    { locality: 'Praha' }
  ])

  assert('Kájovská 68, Český Krumlov', [
    { street: 'Kájovská' }, { housenumber: '68' },
    { locality: 'Český Krumlov' }
  ])

  assert('Beethovenova 641/9, Brno', [
    { street: 'Beethovenova' }, { housenumber: '641/9' },
    { locality: 'Brno' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address CZEs: ${name}`, testFunction)
  }

  testcase(test, common)
}
