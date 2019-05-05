const AddressParser = require('../parser/AddressParser')

const testcase = (test, common) => {
  let parser = new AddressParser()
  let assert = common.assert.bind(null, test, parser)

  assert('21 Viaduct Harbour Avenue', [
    { housenumber: '21' }, { street: 'Viaduct Harbour Avenue' }
  ], true)

  assert('30 Town Point Road', [
    { housenumber: '30' }, { street: 'Town Point Road' }
  ], true)

  assert('2 Te Mako Mako Lane', [
    { housenumber: '2' }, { street: 'Te Mako Mako Lane' }
  ], true)

  assert('56 Blue Ridge Drive', [
    { housenumber: '56' }, { street: 'Blue Ridge Drive' }
  ], true)

  assert('14 Glen Neaves', [
    { housenumber: '14' }, { street: 'Glen Neaves' }
  ], true)

  assert('516 Old Taupo Road', [
    { housenumber: '516' }, { street: 'Old Taupo Road' }
  ], true)

  assert('5658 State Highway 27', [
    { housenumber: '5658' }, { street: 'State Highway 27' }
  ], true)

  assert('2 Meadows Lane', [
    { housenumber: '2' }, { street: 'Meadows Lane' }
  ], true)

  assert('19 Francis Drake Street', [
    { housenumber: '19' }, { street: 'Francis Drake Street' }
  ], true)

  assert('115-121 Hutt Park Road', [
    { housenumber: '115-121' }, { street: 'Hutt Park Road' }
  ], true)

  assert('62 Garden Road', [
    { housenumber: '62' }, { street: 'Garden Road' }
  ], true)

  assert('26 Pine Hill Rise', [
    { housenumber: '26' }, { street: 'Pine Hill Rise' }
  ], true)

  assert('23 Old Wharf Road', [
    { housenumber: '23' }, { street: 'Old Wharf Road' }
  ], true)

  assert('183 Vista Paku', [
    { housenumber: '183' }, { street: 'Vista Paku' }
  ], true)

  assert('109 Mathesons Corner Road', [
    { housenumber: '109' }, { street: 'Mathesons Corner Road' }
  ], true)

  assert('81 Park Terrace', [
    { housenumber: '81' }, { street: 'Park Terrace' }
  ], true)

  // assert('320 Cannon Hill Crescent', [
  //   { housenumber: '320' }, { street: 'Cannon Hill Crescent' }
  // ], true)

  // assert('16 The Stables', [
  //   { housenumber: '16' }, { street: 'The Stables' }
  // ], true)

  assert('35 Forbes Road', [
    { housenumber: '35' }, { street: 'Forbes Road' }
  ], true)

  // assert('260 Broadway', [
  //   { housenumber: '260' }, { street: 'Broadway' }
  // ], true)
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address NZD: ${name}`, testFunction)
  }

  testcase(test, common)
}
