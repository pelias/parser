const testcase = (test, common) => {
  let assertFirstMatch = common.assertFirstMatch(test)
  let assertAllMatch = common.assertAllMatch(test)
  // intersection queries

  // intersection tokens as a prefix are currently unsupported
  // assertFirstMatch('Corner of Main St & Second Ave', [
  //   { street: 'Main St' }, { street: 'Second Ave' }
  // ])
  // assertFirstMatch('cnr west st and north ave', [
  //   { street: 'west st' }, { street: 'north ave' }
  // ])

  assertFirstMatch('Main St & Second Ave', [
    { street: 'Main St' }, { street: 'Second Ave' }
  ])

  assertFirstMatch('Main St @ Second Ave', [
    { street: 'Main St' }, { street: 'Second Ave' }
  ])

  assertFirstMatch('Main St and Second Ave', [
    { street: 'Main St' }, { street: 'Second Ave' }
  ])

  assertFirstMatch('12th Avenue and California Street', [
    { street: '12th Avenue' }, { street: 'California Street' }
  ])

  assertFirstMatch('15th Avenue and Fulton Street', [
    { street: '15th Avenue' }, { street: 'Fulton Street' }
  ])

  assertFirstMatch('17th Avenue & Anza Street', [
    { street: '17th Avenue' }, { street: 'Anza Street' }
  ])

  assertFirstMatch('Gleimstraße an der ecke von Schönhauser Allee', [
    { street: 'Gleimstraße' }, { street: 'Schönhauser Allee' }
  ])

  assertFirstMatch('Gleimstraße und Schönhauserallee', [
    { street: 'Gleimstraße' }, { street: 'Schönhauserallee' }
  ])

  // should not consider intersection tokens for street name
  assertAllMatch('& b', [])
  assertAllMatch('@ b', [])
  assertAllMatch('at b', [])
  assertAllMatch('a &', [])
  assertAllMatch('a @', [])
  assertAllMatch('a at', [])
  assertAllMatch('& street', [])
  assertAllMatch('@ street', [])
  assertAllMatch('carrer &', [])
  assertAllMatch('carrer @', [])

  // should correctly parse street names containing an intersection token
  assertFirstMatch('at street', [{ street: 'at street' }])
  assertFirstMatch('corner street', [{ street: 'corner street' }])
  assertFirstMatch('carrer en', [{ street: 'carrer en' }])
  assertFirstMatch('carrer con', [{ street: 'carrer con' }])

  // no street suffix
  assertFirstMatch('foo & bar', [
    { street: 'foo' }, { street: 'bar' }
  ])
  assertFirstMatch('foo and bar', [
    { street: 'foo' }, { street: 'bar' }
  ])
  assertFirstMatch('foo at bar', [
    { street: 'foo' }, { street: 'bar' }
  ])
  assertFirstMatch('foo @ bar', [
    { street: 'foo' }, { street: 'bar' }
  ])

  // missing street suffix - alpha
  assertFirstMatch('main st & side ave', [
    { street: 'main st' }, { street: 'side ave' }
  ])
  assertFirstMatch('main st & side', [
    { street: 'main st' }, { street: 'side' }
  ])
  assertFirstMatch('main & side ave', [
    { street: 'main' }, { street: 'side ave' }
  ])
  assertFirstMatch('main & side', [
    { street: 'main' }, { street: 'side' }
  ])

  // missing street suffix - ordinal
  assertFirstMatch('1st st & 2nd ave', [
    { street: '1st st' }, { street: '2nd ave' }
  ])
  assertFirstMatch('1st st & 2nd', [
    { street: '1st st' }, { street: '2nd' }
  ])
  assertFirstMatch('1st & 2nd ave', [
    { street: '1st' }, { street: '2nd ave' }
  ])
  assertFirstMatch('1st & 2nd', [
    { street: '1st' }, { street: '2nd' }
  ])

  // missing street suffix - cardinal
  assertFirstMatch('1 st & 2 ave', [
    { street: '1 st' }, { street: '2 ave' }
  ])
  assertFirstMatch('1 st & 2', [
    { street: '1 st' }, { street: '2' }
  ])
  assertFirstMatch('1 & 2 ave', [
    { street: '1' }, { street: '2 ave' }
  ])
  assertFirstMatch('1 & 2', [
    { street: '1' }, { street: '2' }
  ])

  assertFirstMatch('SW 6th & Pine', [
    { street: 'SW 6th' }, { street: 'Pine' }
  ])

  assertFirstMatch('9th and Lambert', [
    { street: '9th' }, { street: 'Lambert' }
  ])

  assertFirstMatch('filbert & 32nd', [
    { street: 'filbert' }, { street: '32nd' }
  ])

  // Should not detect this as an intersection
  // assertFirstMatch('University of Hawaii at Hilo', [
  //   { street: 'SW 6th' }, { street: 'Pine' }
  // ])
  assertFirstMatch('national air and space museum', [
    { place: 'national air and space museum' }
  ])

  // Trimet syntax
  // assertFirstMatch('9,Lambert', [
  //   { street: '9' }, { street: 'Lambert' }
  // ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`intersection: ${name}`, testFunction)
  }

  testcase(test, common)
}
