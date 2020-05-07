const testcase = (test, common) => {
  let assertFirstParseMatches = common.assertFirstParseMatches(test)
  let assertAllParsesMatch = common.assertAllParsesMatch(test)
  // intersection queries

  // intersection tokens as a prefix are currently unsupported
  // assertFirstParseMatches('Corner of Main St & Second Ave', [
  //   { street: 'Main St' }, { street: 'Second Ave' }
  // ])
  // assertFirstParseMatches('cnr west st and north ave', [
  //   { street: 'west st' }, { street: 'north ave' }
  // ])

  assertFirstParseMatches('Main St & Second Ave', [
    { street: 'Main St' }, { street: 'Second Ave' }
  ])

  assertFirstParseMatches('Main St @ Second Ave', [
    { street: 'Main St' }, { street: 'Second Ave' }
  ])

  assertFirstParseMatches('Main St and Second Ave', [
    { street: 'Main St' }, { street: 'Second Ave' }
  ])

  assertFirstParseMatches('12th Avenue and California Street', [
    { street: '12th Avenue' }, { street: 'California Street' }
  ])

  assertFirstParseMatches('15th Avenue and Fulton Street', [
    { street: '15th Avenue' }, { street: 'Fulton Street' }
  ])

  assertFirstParseMatches('17th Avenue & Anza Street', [
    { street: '17th Avenue' }, { street: 'Anza Street' }
  ])

  assertFirstParseMatches('Gleimstraße an der ecke von Schönhauser Allee', [
    { street: 'Gleimstraße' }, { street: 'Schönhauser Allee' }
  ])

  assertFirstParseMatches('Gleimstraße und Schönhauserallee', [
    { street: 'Gleimstraße' }, { street: 'Schönhauserallee' }
  ])

  // should not consider intersection tokens for street name
  assertAllParsesMatch('& b', [])
  assertAllParsesMatch('@ b', [])
  assertAllParsesMatch('at b', [])
  assertAllParsesMatch('a &', [])
  assertAllParsesMatch('a @', [])
  assertAllParsesMatch('a at', [])
  assertAllParsesMatch('& street', [])
  assertAllParsesMatch('@ street', [])
  assertAllParsesMatch('carrer &', [])
  assertAllParsesMatch('carrer @', [])

  // should correctly parse street names containing an intersection token
  assertFirstParseMatches('at street', [{ street: 'at street' }])
  assertFirstParseMatches('corner street', [{ street: 'corner street' }])
  assertFirstParseMatches('carrer en', [{ street: 'carrer en' }])
  assertFirstParseMatches('carrer con', [{ street: 'carrer con' }])

  // no street suffix
  assertFirstParseMatches('foo & bar', [
    { street: 'foo' }, { street: 'bar' }
  ])
  assertFirstParseMatches('foo and bar', [
    { street: 'foo' }, { street: 'bar' }
  ])
  assertFirstParseMatches('foo at bar', [
    { street: 'foo' }, { street: 'bar' }
  ])
  assertFirstParseMatches('foo @ bar', [
    { street: 'foo' }, { street: 'bar' }
  ])

  // missing street suffix - alpha
  assertFirstParseMatches('main st & side ave', [
    { street: 'main st' }, { street: 'side ave' }
  ])
  assertFirstParseMatches('main st & side', [
    { street: 'main st' }, { street: 'side' }
  ])
  assertFirstParseMatches('main & side ave', [
    { street: 'main' }, { street: 'side ave' }
  ])
  assertFirstParseMatches('main & side', [
    { street: 'main' }, { street: 'side' }
  ])

  // missing street suffix - ordinal
  assertFirstParseMatches('1st st & 2nd ave', [
    { street: '1st st' }, { street: '2nd ave' }
  ])
  assertFirstParseMatches('1st st & 2nd', [
    { street: '1st st' }, { street: '2nd' }
  ])
  assertFirstParseMatches('1st & 2nd ave', [
    { street: '1st' }, { street: '2nd ave' }
  ])
  assertFirstParseMatches('1st & 2nd', [
    { street: '1st' }, { street: '2nd' }
  ])

  // missing street suffix - cardinal
  assertFirstParseMatches('1 st & 2 ave', [
    { street: '1 st' }, { street: '2 ave' }
  ])
  assertFirstParseMatches('1 st & 2', [
    { street: '1 st' }, { street: '2' }
  ])
  assertFirstParseMatches('1 & 2 ave', [
    { street: '1' }, { street: '2 ave' }
  ])
  assertFirstParseMatches('1 & 2', [
    { street: '1' }, { street: '2' }
  ])

  assertFirstParseMatches('SW 6th & Pine', [
    { street: 'SW 6th' }, { street: 'Pine' }
  ])

  assertFirstParseMatches('9th and Lambert', [
    { street: '9th' }, { street: 'Lambert' }
  ])

  assertFirstParseMatches('filbert & 32nd', [
    { street: 'filbert' }, { street: '32nd' }
  ])

  // Should not detect this as an intersection
  // assertFirstParseMatches('University of Hawaii at Hilo', [
  //   { street: 'SW 6th' }, { street: 'Pine' }
  // ])
  assertFirstParseMatches('national air and space museum', [
    { place: 'national air and space museum' }
  ])

  // Trimet syntax
  // assertFirstParseMatches('9,Lambert', [
  //   { street: '9' }, { street: 'Lambert' }
  // ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`intersection: ${name}`, testFunction)
  }

  testcase(test, common)
}
