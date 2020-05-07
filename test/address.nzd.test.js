const testcase = (test, common) => {
  let assertFirstMatch = common.assertFirstMatch(test)

  assertFirstMatch('21 Viaduct Harbour Avenue', [
    { housenumber: '21' }, { street: 'Viaduct Harbour Avenue' }
  ])

  assertFirstMatch('30 Town Point Road', [
    { housenumber: '30' }, { street: 'Town Point Road' }
  ])

  assertFirstMatch('2 Te Mako Mako Lane', [
    { housenumber: '2' }, { street: 'Te Mako Mako Lane' }
  ])

  assertFirstMatch('56 Blue Ridge Drive', [
    { housenumber: '56' }, { street: 'Blue Ridge Drive' }
  ])

  assertFirstMatch('14 Glen Neaves', [
    { housenumber: '14' }, { street: 'Glen Neaves' }
  ])

  assertFirstMatch('516 Old Taupo Road', [
    { housenumber: '516' }, { street: 'Old Taupo Road' }
  ])

  assertFirstMatch('5658 State Highway 27', [
    { housenumber: '5658' }, { street: 'State Highway 27' }
  ])

  assertFirstMatch('2 Meadows Lane', [
    { housenumber: '2' }, { street: 'Meadows Lane' }
  ])

  assertFirstMatch('19 Francis Drake Street', [
    { housenumber: '19' }, { street: 'Francis Drake Street' }
  ])

  assertFirstMatch('115-121 Hutt Park Road', [
    { housenumber: '115-121' }, { street: 'Hutt Park Road' }
  ])

  assertFirstMatch('62 Garden Road', [
    { housenumber: '62' }, { street: 'Garden Road' }
  ])

  assertFirstMatch('26 Pine Hill Rise', [
    { housenumber: '26' }, { street: 'Pine Hill Rise' }
  ])

  assertFirstMatch('23 Old Wharf Road', [
    { housenumber: '23' }, { street: 'Old Wharf Road' }
  ])

  assertFirstMatch('183 Vista Paku', [
    { housenumber: '183' }, { street: 'Vista Paku' }
  ])

  assertFirstMatch('109 Mathesons Corner Road', [
    { housenumber: '109' }, { street: 'Mathesons Corner Road' }
  ])

  assertFirstMatch('81 Park Terrace', [
    { housenumber: '81' }, { street: 'Park Terrace' }
  ])

  assertFirstMatch('320 Cannon Hill Crescent', [
    { housenumber: '320' }, { street: 'Cannon Hill Crescent' }
  ])

  assertFirstMatch('16 The Stables', [
    { housenumber: '16' }, { street: 'The Stables' }
  ])

  assertFirstMatch('35 Forbes Road', [
    { housenumber: '35' }, { street: 'Forbes Road' }
  ])

  assertFirstMatch('40 O\'Shannessey Street', [
    { housenumber: '40' }, { street: 'O\'Shannessey Street' }
  ])

  // assertFirstMatch('37 Hillpark Drive', [
  //   { housenumber: '37' }, { street: 'Hillpark Drive' }
  // ])

  // assertFirstMatch('260 Broadway', [
  //   { housenumber: '260' }, { street: 'Broadway' }
  // ])

  // assertFirstMatch('16 Tullamore', [
  //   { housenumber: '16' }, { street: 'Tullamore' }
  // ])

  assertFirstMatch('4207 Mountain Road', [
    { housenumber: '4207' }, { street: 'Mountain Road' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address NZD: ${name}`, testFunction)
  }

  testcase(test, common)
}
