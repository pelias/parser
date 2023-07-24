const testcase = (test, common) => {
  let assert = common.assert(test)

  assert('Szewska 6, Kraków', [
    { street: 'Szewska' }, { housenumber: '6' },
    { locality: 'Kraków' }
  ])

  assert('aleja Wojska Polskiego 178', [
    { street: 'aleja Wojska' }, { locality: 'Polskiego' }
  ])

  assert('Ulica Strzelecka 12, Nowy Sącz', [
    { street: 'Ulica Strzelecka' }, { housenumber: '12'},
    { locality: "Nowy Sącz" }
  ])

  assert('Żorska 11, 47-400', [
    { street: 'Żorska' }, { housenumber: '11' },
    { postcode: '47-400' }
  ])
 
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address POL: ${name}`, testFunction)
  }

  testcase(test, common)
}
