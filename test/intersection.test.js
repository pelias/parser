const testcase = (test, common) => {
  let assertFirstSolution = common.assertFirstSolution(test)
  let assertFirstSolutions = common.assertFirstSolutions(test)
  // intersection queries

  // intersection tokens as a prefix are currently unsupported
  // assertFirstSolution('Corner of Main St & Second Ave', [
  //   { street: 'Main St' }, { street: 'Second Ave' }
  // ])
  // assertFirstSolution('cnr west st and north ave', [
  //   { street: 'west st' }, { street: 'north ave' }
  // ])

  assertFirstSolution('Main St & Second Ave', [
    { street: 'Main St' }, { street: 'Second Ave' }
  ])

  assertFirstSolution('Main St @ Second Ave', [
    { street: 'Main St' }, { street: 'Second Ave' }
  ])

  assertFirstSolution('Main St and Second Ave', [
    { street: 'Main St' }, { street: 'Second Ave' }
  ])

  assertFirstSolution('12th Avenue and California Street', [
    { street: '12th Avenue' }, { street: 'California Street' }
  ])

  assertFirstSolution('15th Avenue and Fulton Street', [
    { street: '15th Avenue' }, { street: 'Fulton Street' }
  ])

  assertFirstSolution('17th Avenue & Anza Street', [
    { street: '17th Avenue' }, { street: 'Anza Street' }
  ])

  assertFirstSolution('Gleimstraße an der ecke von Schönhauser Allee', [
    { street: 'Gleimstraße' }, { street: 'Schönhauser Allee' }
  ])

  assertFirstSolution('Gleimstraße und Schönhauserallee', [
    { street: 'Gleimstraße' }, { street: 'Schönhauserallee' }
  ])

  // should not consider intersection tokens for street name
  assertFirstSolutions('& b', [])
  assertFirstSolutions('@ b', [])
  assertFirstSolutions('at b', [])
  assertFirstSolutions('a &', [])
  assertFirstSolutions('a @', [])
  assertFirstSolutions('a at', [])
  assertFirstSolutions('& street', [])
  assertFirstSolutions('@ street', [])
  assertFirstSolutions('carrer &', [])
  assertFirstSolutions('carrer @', [])

  // should correctly parse street names containing an intersection token
  assertFirstSolution('at street', [{ street: 'at street' }])
  assertFirstSolution('corner street', [{ street: 'corner street' }])
  assertFirstSolution('carrer en', [{ street: 'carrer en' }])
  assertFirstSolution('carrer con', [{ street: 'carrer con' }])

  // no street suffix
  assertFirstSolution('foo & bar', [
    { street: 'foo' }, { street: 'bar' }
  ])
  assertFirstSolution('foo and bar', [
    { street: 'foo' }, { street: 'bar' }
  ])
  assertFirstSolution('foo at bar', [
    { street: 'foo' }, { street: 'bar' }
  ])
  assertFirstSolution('foo @ bar', [
    { street: 'foo' }, { street: 'bar' }
  ])

  // missing street suffix - alpha
  assertFirstSolution('main st & side ave', [
    { street: 'main st' }, { street: 'side ave' }
  ])
  assertFirstSolution('main st & side', [
    { street: 'main st' }, { street: 'side' }
  ])
  assertFirstSolution('main & side ave', [
    { street: 'main' }, { street: 'side ave' }
  ])
  assertFirstSolution('main & side', [
    { street: 'main' }, { street: 'side' }
  ])

  // missing street suffix - ordinal
  assertFirstSolution('1st st & 2nd ave', [
    { street: '1st st' }, { street: '2nd ave' }
  ])
  assertFirstSolution('1st st & 2nd', [
    { street: '1st st' }, { street: '2nd' }
  ])
  assertFirstSolution('1st & 2nd ave', [
    { street: '1st' }, { street: '2nd ave' }
  ])
  assertFirstSolution('1st & 2nd', [
    { street: '1st' }, { street: '2nd' }
  ])

  // missing street suffix - cardinal
  assertFirstSolution('1 st & 2 ave', [
    { street: '1 st' }, { street: '2 ave' }
  ])
  assertFirstSolution('1 st & 2', [
    { street: '1 st' }, { street: '2' }
  ])
  assertFirstSolution('1 & 2 ave', [
    { street: '1' }, { street: '2 ave' }
  ])
  assertFirstSolution('1 & 2', [
    { street: '1' }, { street: '2' }
  ])

  assertFirstSolution('SW 6th & Pine', [
    { street: 'SW 6th' }, { street: 'Pine' }
  ])

  assertFirstSolution('9th and Lambert', [
    { street: '9th' }, { street: 'Lambert' }
  ])

  assertFirstSolution('filbert & 32nd', [
    { street: 'filbert' }, { street: '32nd' }
  ])

  // Should not detect this as an intersection
  // assertFirstSolution('University of Hawaii at Hilo', [
  //   { street: 'SW 6th' }, { street: 'Pine' }
  // ])
  assertFirstSolution('national air and space museum', [
    { place: 'national air and space museum' }
  ])

  // Trimet syntax
  // assertFirstSolution('9,Lambert', [
  //   { street: '9' }, { street: 'Lambert' }
  // ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`intersection: ${name}`, testFunction)
  }

  testcase(test, common)
}
