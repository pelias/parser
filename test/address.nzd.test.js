const testcase = (test, common) => {
  let assert = common.assert(test)

  assert('21 Viaduct Harbour Avenue', [
    { housenumber: '21' }, { street: 'Viaduct Harbour Avenue' }
  ])

  assert('30 Town Point Road', [
    { housenumber: '30' }, { street: 'Town Point Road' }
  ])

  assert('2 Te Mako Mako Lane', [
    { housenumber: '2' }, { street: 'Te Mako Mako Lane' }
  ])

  assert('56 Blue Ridge Drive', [
    { housenumber: '56' }, { street: 'Blue Ridge Drive' }
  ])

  assert('14 Glen Neaves', [
    { housenumber: '14' }, { street: 'Glen Neaves' }
  ])

  assert('516 Old Taupo Road', [
    { housenumber: '516' }, { street: 'Old Taupo Road' }
  ])

  assert('5658 State Highway 27', [
    { housenumber: '5658' }, { street: 'State Highway 27' }
  ])

  assert('2 Meadows Lane', [
    { housenumber: '2' }, { street: 'Meadows Lane' }
  ])

  assert('19 Francis Drake Street', [
    { housenumber: '19' }, { street: 'Francis Drake Street' }
  ])

  assert('115-121 Hutt Park Road', [
    { housenumber: '115-121' }, { street: 'Hutt Park Road' }
  ])

  assert('62 Garden Road', [
    { housenumber: '62' }, { street: 'Garden Road' }
  ])

  assert('26 Pine Hill Rise', [
    { housenumber: '26' }, { street: 'Pine Hill Rise' }
  ])

  assert('23 Old Wharf Road', [
    { housenumber: '23' }, { street: 'Old Wharf Road' }
  ])

  assert('183 Vista Paku', [
    { housenumber: '183' }, { street: 'Vista Paku' }
  ])

  assert('109 Mathesons Corner Road', [
    { housenumber: '109' }, { street: 'Mathesons Corner Road' }
  ])

  assert('81 Park Terrace', [
    { housenumber: '81' }, { street: 'Park Terrace' }
  ])

  assert('320 Cannon Hill Crescent', [
    { housenumber: '320' }, { street: 'Cannon Hill Crescent' }
  ])

  assert('16 The Stables', [
    { housenumber: '16' }, { street: 'The Stables' }
  ])

  assert('35 Forbes Road', [
    { housenumber: '35' }, { street: 'Forbes Road' }
  ])

  assert('40 O\'Shannessey Street', [
    { housenumber: '40' }, { street: 'O\'Shannessey Street' }
  ])

  // assert('37 Hillpark Drive', [
  //   { housenumber: '37' }, { street: 'Hillpark Drive' }
  // ])

  // assert('260 Broadway', [
  //   { housenumber: '260' }, { street: 'Broadway' }
  // ])

  // assert('16 Tullamore', [
  //   { housenumber: '16' }, { street: 'Tullamore' }
  // ])

  assert('4207 Mountain Road', [
    { housenumber: '4207' }, { street: 'Mountain Road' }
  ])

  assert('Mt Victoria Rd, Wellington', [
    { street: 'Mt Victoria Rd' }, { locality: 'Wellington' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address NZD: ${name}`, testFunction)
  }

  testcase(test, common)
}
