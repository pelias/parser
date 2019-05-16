const AddressParser = require('../parser/AddressParser')

const testcase = (test, common) => {
  let parser = new AddressParser()
  let assert = common.assert.bind(null, test, parser)

  // intersection queries
  assert('Corner of Main St & Second Ave', [
    [{ street: 'Main St' }, { street: 'Second Ave' }]
  ])

  assert('Main St & Second Ave', [
    [{ street: 'Main St' }, { street: 'Second Ave' }]
  ])

  assert('Main St @ Second Ave', [
    [{ street: 'Main St' }, { street: 'Second Ave' }]
  ])

  assert('Gleimstraße an der ecke von Schönhauser Allee', [
    [{ street: 'Gleimstraße' }, { street: 'Schönhauser Allee' }],
    [{ street: 'Gleimstraße' }, { region: 'an' }]
  ])

  assert('Gleimstraße und Schönhauserallee', [
    [{ street: 'Gleimstraße' }, { street: 'Schönhauserallee' }]
  ])

  assert('cnr west st and north ave', [
    [{ street: 'west st' }, { street: 'north ave' }]
  ])

  // should not consider intersection tokens for street name
  assert('& b', [])
  assert('a &', [])

  // no street suffix
  assert('foo & bar', [
    [{ street: 'foo' }, { street: 'bar' }]
  ])
  assert('foo and bar', [
    [{ street: 'foo' }, { street: 'bar' }]
  ])
  assert('foo at bar', [
    [{ street: 'foo' }, { street: 'bar' }]
  ])
  assert('foo @ bar', [
    [{ street: 'foo' }, { street: 'bar' }]
  ])

  // missing street suffix - alpha
  assert('main st & side ave', [
    [{ street: 'main st' }, { street: 'side ave' }]
  ])
  assert('main st & side', [
    [{ street: 'main st' }, { street: 'side' }]
  ])
  assert('main & side ave', [
    [{ street: 'main' }, { street: 'side ave' }]
  ])
  assert('main & side', [
    [{ street: 'main' }, { street: 'side' }]
  ])

  // missing street suffix - ordinal
  assert('1st st & 2nd ave', [
    [{ street: '1st st' }, { street: '2nd ave' }]
  ])
  assert('1st st & 2nd', [
    [{ street: '1st st' }, { street: '2nd' }]
  ])
  assert('1st & 2nd ave', [
    [{ street: '1st' }, { street: '2nd ave' }]
  ])
  assert('1st & 2nd', [
    [{ street: '1st' }, { street: '2nd' }]
  ])

  // missing street suffix - cardinal
  assert('1 st & 2 ave', [
    [{ street: '1 st' }, { street: '2 ave' }]
  ])
  assert('1 st & 2', [
    [{ street: '1 st' }, { street: '2' }]
  ])
  assert('1 & 2 ave', [
    [{ street: '1' }, { street: '2 ave' }]
  ])
  assert('1 & 2', [
    [{ street: '1' }, { street: '2' }]
  ])

  assert('SW 6th & Pine', [
    [{ street: 'SW 6th' }, { street: 'Pine' }]
  ])

  // Should not detect this as an intersection
  // assert('University of Hawaii at Hilo', [
  //   [{ street: 'SW 6th' }, { street: 'Pine' }]
  // ])
  // assert('national air and space museum', [
  //   [{ street: 'SW 6th' }, { street: 'Pine' }]
  // ])

  // Trimet syntax
  // assert('9,Lambert', [
  //   [{ street: '9' }, { street: 'Lambert' }]
  // ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`intersection: ${name}`, testFunction)
  }

  testcase(test, common)
}
