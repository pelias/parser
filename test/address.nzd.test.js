const testcase = (test, common) => {
  let assertFirstParseMatches = common.assertFirstParseMatches(test)

  assertFirstParseMatches('21 Viaduct Harbour Avenue', [
    { housenumber: '21' }, { street: 'Viaduct Harbour Avenue' }
  ])

  assertFirstParseMatches('30 Town Point Road', [
    { housenumber: '30' }, { street: 'Town Point Road' }
  ])

  assertFirstParseMatches('2 Te Mako Mako Lane', [
    { housenumber: '2' }, { street: 'Te Mako Mako Lane' }
  ])

  assertFirstParseMatches('56 Blue Ridge Drive', [
    { housenumber: '56' }, { street: 'Blue Ridge Drive' }
  ])

  assertFirstParseMatches('14 Glen Neaves', [
    { housenumber: '14' }, { street: 'Glen Neaves' }
  ])

  assertFirstParseMatches('516 Old Taupo Road', [
    { housenumber: '516' }, { street: 'Old Taupo Road' }
  ])

  assertFirstParseMatches('5658 State Highway 27', [
    { housenumber: '5658' }, { street: 'State Highway 27' }
  ])

  assertFirstParseMatches('2 Meadows Lane', [
    { housenumber: '2' }, { street: 'Meadows Lane' }
  ])

  assertFirstParseMatches('19 Francis Drake Street', [
    { housenumber: '19' }, { street: 'Francis Drake Street' }
  ])

  assertFirstParseMatches('115-121 Hutt Park Road', [
    { housenumber: '115-121' }, { street: 'Hutt Park Road' }
  ])

  assertFirstParseMatches('62 Garden Road', [
    { housenumber: '62' }, { street: 'Garden Road' }
  ])

  assertFirstParseMatches('26 Pine Hill Rise', [
    { housenumber: '26' }, { street: 'Pine Hill Rise' }
  ])

  assertFirstParseMatches('23 Old Wharf Road', [
    { housenumber: '23' }, { street: 'Old Wharf Road' }
  ])

  assertFirstParseMatches('183 Vista Paku', [
    { housenumber: '183' }, { street: 'Vista Paku' }
  ])

  assertFirstParseMatches('109 Mathesons Corner Road', [
    { housenumber: '109' }, { street: 'Mathesons Corner Road' }
  ])

  assertFirstParseMatches('81 Park Terrace', [
    { housenumber: '81' }, { street: 'Park Terrace' }
  ])

  assertFirstParseMatches('320 Cannon Hill Crescent', [
    { housenumber: '320' }, { street: 'Cannon Hill Crescent' }
  ])

  assertFirstParseMatches('16 The Stables', [
    { housenumber: '16' }, { street: 'The Stables' }
  ])

  assertFirstParseMatches('35 Forbes Road', [
    { housenumber: '35' }, { street: 'Forbes Road' }
  ])

  assertFirstParseMatches('40 O\'Shannessey Street', [
    { housenumber: '40' }, { street: 'O\'Shannessey Street' }
  ])

  // assertFirstParseMatches('37 Hillpark Drive', [
  //   { housenumber: '37' }, { street: 'Hillpark Drive' }
  // ])

  // assertFirstParseMatches('260 Broadway', [
  //   { housenumber: '260' }, { street: 'Broadway' }
  // ])

  // assertFirstParseMatches('16 Tullamore', [
  //   { housenumber: '16' }, { street: 'Tullamore' }
  // ])

  assertFirstParseMatches('4207 Mountain Road', [
    { housenumber: '4207' }, { street: 'Mountain Road' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address NZD: ${name}`, testFunction)
  }

  testcase(test, common)
}
