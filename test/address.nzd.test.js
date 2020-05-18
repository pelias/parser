const testcase = (test, common) => {
  let assertFirstSolution = common.assertFirstSolution(test)

  assertFirstSolution('21 Viaduct Harbour Avenue', [
    { housenumber: '21' }, { street: 'Viaduct Harbour Avenue' }
  ])

  assertFirstSolution('30 Town Point Road', [
    { housenumber: '30' }, { street: 'Town Point Road' }
  ])

  assertFirstSolution('2 Te Mako Mako Lane', [
    { housenumber: '2' }, { street: 'Te Mako Mako Lane' }
  ])

  assertFirstSolution('56 Blue Ridge Drive', [
    { housenumber: '56' }, { street: 'Blue Ridge Drive' }
  ])

  assertFirstSolution('14 Glen Neaves', [
    { housenumber: '14' }, { street: 'Glen Neaves' }
  ])

  assertFirstSolution('516 Old Taupo Road', [
    { housenumber: '516' }, { street: 'Old Taupo Road' }
  ])

  assertFirstSolution('5658 State Highway 27', [
    { housenumber: '5658' }, { street: 'State Highway 27' }
  ])

  assertFirstSolution('2 Meadows Lane', [
    { housenumber: '2' }, { street: 'Meadows Lane' }
  ])

  assertFirstSolution('19 Francis Drake Street', [
    { housenumber: '19' }, { street: 'Francis Drake Street' }
  ])

  assertFirstSolution('115-121 Hutt Park Road', [
    { housenumber: '115-121' }, { street: 'Hutt Park Road' }
  ])

  assertFirstSolution('62 Garden Road', [
    { housenumber: '62' }, { street: 'Garden Road' }
  ])

  assertFirstSolution('26 Pine Hill Rise', [
    { housenumber: '26' }, { street: 'Pine Hill Rise' }
  ])

  assertFirstSolution('23 Old Wharf Road', [
    { housenumber: '23' }, { street: 'Old Wharf Road' }
  ])

  assertFirstSolution('183 Vista Paku', [
    { housenumber: '183' }, { street: 'Vista Paku' }
  ])

  assertFirstSolution('109 Mathesons Corner Road', [
    { housenumber: '109' }, { street: 'Mathesons Corner Road' }
  ])

  assertFirstSolution('81 Park Terrace', [
    { housenumber: '81' }, { street: 'Park Terrace' }
  ])

  assertFirstSolution('320 Cannon Hill Crescent', [
    { housenumber: '320' }, { street: 'Cannon Hill Crescent' }
  ])

  assertFirstSolution('16 The Stables', [
    { housenumber: '16' }, { street: 'The Stables' }
  ])

  assertFirstSolution('35 Forbes Road', [
    { housenumber: '35' }, { street: 'Forbes Road' }
  ])

  assertFirstSolution('40 O\'Shannessey Street', [
    { housenumber: '40' }, { street: 'O\'Shannessey Street' }
  ])

  // assertFirstSolution('37 Hillpark Drive', [
  //   { housenumber: '37' }, { street: 'Hillpark Drive' }
  // ])

  // assertFirstSolution('260 Broadway', [
  //   { housenumber: '260' }, { street: 'Broadway' }
  // ])

  // assertFirstSolution('16 Tullamore', [
  //   { housenumber: '16' }, { street: 'Tullamore' }
  // ])

  assertFirstSolution('4207 Mountain Road', [
    { housenumber: '4207' }, { street: 'Mountain Road' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address NZD: ${name}`, testFunction)
  }

  testcase(test, common)
}
