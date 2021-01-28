const testcase = (test, common) => {
  let assert = common.assert(test)

  assert('Julianastraat, Heel', [
    { street: 'Julianastraat' }, { locality: 'Heel' }
  ])

  assert('Lindenlaan, Sint Odilienberg', [
    { street: 'Lindenlaan' }, { locality: 'Sint Odilienberg' }
  ])

  assert('Bosserdijk, Hoogland', [
    { street: 'Bosserdijk' }, { locality: 'Hoogland' }
  ])

  assert('St Ludgerusstraat, Utrecht', [
    { street: 'St Ludgerusstraat' }, { locality: 'Utrecht' }
  ])

  assert('Lange Groenendaal, Gouda', [
    { street: 'Lange Groenendaal' }, { locality: 'Gouda' }
  ])

  assert('Achter Clarenburg, Utrecht', [
    { street: 'Achter Clarenburg' }, { locality: 'Utrecht' }
  ])

  assert('Brinkstraat 87, 7512EC, Enschede', [
    { street: 'Brinkstraat' }, { housenumber: '87' }, { postcode: '7512EC' }, { locality: 'Enschede' }
  ])

  assert('Brinkstraat 87, 7512 EC, Enschede', [
    { street: 'Brinkstraat' }, { housenumber: '87' }, { postcode: '7512 EC' }, { locality: 'Enschede' }
  ])

  assert('Weerdsingel O.Z., Utrecht', [
    { street: 'Weerdsingel O.Z.' }, { locality: 'Utrecht' }
  ])

  assert('Oranjelaan Westzijde 41, Puttershoek', [
    { street: 'Oranjelaan Westzije' }, { housenumber: '41' }, { locality: 'Puttershoek' }
  ])

  assert('Middelstraat 18, De Moer', [
    { street: 'Middelstraat' }, { housenumber: '18' }, { locality: 'De Moer' }
  ])

  assert('Rembrandtplein, Amsterdam', [
    { street: 'Rembrandtplein' }, { locality: 'Amsterdam' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address NLD: ${name}`, testFunction)
  }

  testcase(test, common)
}
