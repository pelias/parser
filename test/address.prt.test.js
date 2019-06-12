const testcase = (test, common) => {
  let assert = common.assert(test)

  assert('Rua Luis de Camoes', [
    { street: 'Rua Luis de Camoes' }
  ], true)

  assert('Rua Padre Cruz 31 3060-187 Cantanhede', [
    { street: 'Rua Padre Cruz' }, { housenumber: '31' },
    { postcode: '3060-187' }, { locality: 'Cantanhede' }
  ], true)

  assert('Tv. da Horta 27A', [
    { street: 'Tv. da Horta' }, { housenumber: '27A' }
  ], true)

  assert('R Academia das Ciências 17C 1200-030 Lisboa', [
    { street: 'R Academia das Ciências' }, { housenumber: '17C' },
    { postcode: '1200-030' }, { region: 'Lisboa' }
  ], true)

  assert('Rua do Sol a Santa Catarina 17B, 1200-452 Lisboa', [
    { street: 'Rua do Sol a Santa Catarina' }, { housenumber: '17B' },
    { postcode: '1200-452' }, { region: 'Lisboa' }
  ], true)

  assert('Tv. dos Fiéis de Deus 12C Lisboa Portugal', [
    { street: 'Tv. dos Fiéis de Deus' }, { housenumber: '12C' },
    { region: 'Lisboa' }, { country: 'Portugal' }
  ], true)
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address PRT: ${name}`, testFunction)
  }

  testcase(test, common)
}
