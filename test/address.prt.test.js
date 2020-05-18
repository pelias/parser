const testcase = (test, common) => {
  let assertFirstSolution = common.assertFirstSolution(test)

  assertFirstSolution('Rua Luis de Camoes', [
    { street: 'Rua Luis de Camoes' }
  ])

  assertFirstSolution('Rua Padre Cruz 31 3060-187 Cantanhede', [
    { street: 'Rua Padre Cruz' }, { housenumber: '31' },
    { postcode: '3060-187' }, { locality: 'Cantanhede' }
  ])

  assertFirstSolution('Tv. da Horta 27A', [
    { street: 'Tv. da Horta' }, { housenumber: '27A' }
  ])

  assertFirstSolution('R Academia das Ciências 17C 1200-030 Lisboa', [
    { street: 'R Academia das Ciências' }, { housenumber: '17C' },
    { postcode: '1200-030' }, { region: 'Lisboa' }
  ])

  assertFirstSolution('Rua do Sol a Santa Catarina 17B, 1200-452 Lisboa', [
    { street: 'Rua do Sol a Santa Catarina' }, { housenumber: '17B' },
    { postcode: '1200-452' }, { region: 'Lisboa' }
  ])

  assertFirstSolution('Tv. dos Fiéis de Deus 12C Lisboa Portugal', [
    { street: 'Tv. dos Fiéis de Deus' }, { housenumber: '12C' },
    { region: 'Lisboa' }, { country: 'Portugal' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address PRT: ${name}`, testFunction)
  }

  testcase(test, common)
}
