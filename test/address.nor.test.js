const testcase = (test, common) => {
  let assert = common.assert(test)

  assert('Skredderplassen 20', [
    { street: 'Skredderplassen' }, { housenumber: '20' }
  ])

  assert('Henrik Walters plass 3', [
    { street: 'Henrik Walters plass' }, { housenumber: '3' }
  ])

  assert('Vestre Haugen 74', [
    { street: 'Vestre Haugen' }, { housenumber: '74' }
  ])

  assert('Maria Dehlis vei 15', [
    { street: 'Maria Dehlis vei' }, { housenumber: '15' }
  ])

  assert('Gamle Drammensvei 163', [
    { street: 'Gamle Drammensvei' }, { housenumber: '163' }
  ])

  assert('Grense Jakobselv veien 311', [
    { street: 'Grense Jakobselv veien' }, { housenumber: '311' }
  ])

  assert('Epleskogen 39A', [
    { street: 'Epleskogen' }, { housenumber: '39A' }
  ])

  assert('Øvste Skogen 121', [
    { street: 'Øvste Skogen' }, { housenumber: '121' }
  ])

  assert('Tindvegen nedre 44B', [
    { street: 'Tindvegen nedre' }, { housenumber: '44B' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address AUS: ${name}`, testFunction)
  }

  testcase(test, common)
}
