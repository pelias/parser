const testcase = (test, common) => {
  let assert = common.assert(test)

  // intersection queries

  // intersection tokens as a prefix are currently unsupported
  // assert('Corner of Main St & Second Ave', [
  //   { street: 'Main St' }, { street: 'Second Ave' }
  // ])
  // assert('cnr west st and north ave', [
  //   { street: 'west st' }, { street: 'north ave' }
  // ])

  assert('Main St & Second Ave', [
    { street: 'Main St' }, { street: 'Second Ave' }
  ])

  assert('Main St @ Second Ave', [
    { street: 'Main St' }, { street: 'Second Ave' }
  ])

  assert('Main St and Second Ave', [
    { street: 'Main St' }, { street: 'Second Ave' }
  ])

  assert('12th Avenue and California Street', [
    { street: '12th Avenue' }, { street: 'California Street' }
  ])

  assert('15th Avenue and Fulton Street', [
    { street: '15th Avenue' }, { street: 'Fulton Street' }
  ])

  assert('17th Avenue & Anza Street', [
    { street: '17th Avenue' }, { street: 'Anza Street' }
  ])

  assert('Gleimstraße an der ecke von Schönhauser Allee', [
    { street: 'Gleimstraße' }, { street: 'Schönhauser Allee' }
  ])

  assert('Gleimstraße und Schönhauserallee', [
    { street: 'Gleimstraße' }, { street: 'Schönhauserallee' }
  ])

  // should not consider intersection tokens for street name
  assert('& b', [], false)
  assert('@ b', [], false)
  assert('at b', [], false)
  assert('a &', [], false)
  assert('a @', [], false)
  assert('a at', [], false)
  assert('& street', [], false)
  assert('@ street', [], false)
  assert('carrer &', [], false)
  assert('carrer @', [], false)

  // should correctly parse street names containing an intersection token
  assert('at street', [{ street: 'at street' }])
  assert('corner street', [{ street: 'corner street' }])
  assert('carrer en', [{ street: 'carrer en' }])
  assert('carrer con', [{ street: 'carrer con' }])

  // no street suffix
  assert('foo & bar', [
    { street: 'foo' }, { street: 'bar' }
  ])
  assert('foo and bar', [
    { street: 'foo' }, { street: 'bar' }
  ])
  assert('foo at bar', [
    { street: 'foo' }, { street: 'bar' }
  ])
  assert('foo @ bar', [
    { street: 'foo' }, { street: 'bar' }
  ])

  // missing street suffix - alpha
  assert('main st & side ave', [
    { street: 'main st' }, { street: 'side ave' }
  ])
  assert('main st & side', [
    { street: 'main st' }, { street: 'side' }
  ])
  assert('main & side ave', [
    { street: 'main' }, { street: 'side ave' }
  ])
  assert('main & side', [
    { street: 'main' }, { street: 'side' }
  ])

  // missing street suffix - ordinal
  assert('1st st & 2nd ave', [
    { street: '1st st' }, { street: '2nd ave' }
  ])
  assert('1st st & 2nd', [
    { street: '1st st' }, { street: '2nd' }
  ])
  assert('1st & 2nd ave', [
    { street: '1st' }, { street: '2nd ave' }
  ])
  assert('1st & 2nd', [
    { street: '1st' }, { street: '2nd' }
  ])

  // missing street suffix - cardinal
  assert('1 st & 2 ave', [
    { street: '1 st' }, { street: '2 ave' }
  ])
  assert('1 st & 2', [
    { street: '1 st' }, { street: '2' }
  ])
  assert('1 & 2 ave', [
    { street: '1' }, { street: '2 ave' }
  ])
  assert('1 & 2', [
    { street: '1' }, { street: '2' }
  ])

  assert('SW 6th & Pine', [
    { street: 'SW 6th' }, { street: 'Pine' }
  ])

  assert('9th and Lambert', [
    { street: '9th' }, { street: 'Lambert' }
  ])

  assert('filbert & 32nd', [
    { street: 'filbert' }, { street: '32nd' }
  ])

  // Should not detect this as an intersection
  // assert('University of Hawaii at Hilo', [
  //   { street: 'SW 6th' }, { street: 'Pine' }
  // ])
  assert('national air and space museum', [
    { venue: 'national air and space museum' }
  ])

  // Trimet syntax
  // assert('9,Lambert', [
  //   { street: '9' }, { street: 'Lambert' }
  // ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`intersection: ${name}`, testFunction)
  }

  testcase(test, common)
}
