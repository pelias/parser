const testcase = (test, common) => {
  let assert = common.assert(test)

  assert('Rua Raul Leite Magalhães, 65, Tapiraí - SP, 18180-000, Brazil', [
    { street: 'Rua Raul Leite Magalhães' },
    { housenumber: '65' },
    { locality: 'Tapiraí' },
    { region: 'SP' },
    { postcode: '18180-000' },
    { country: 'Brazil' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address BRA: ${name}`, testFunction)
  }

  testcase(test, common)
}
