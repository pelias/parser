const testcase = (test, common) => {
  let assertFirstParseMatches = common.assertFirstParseMatches(test)

  assertFirstParseMatches('Rua Luis de Camoes', [
    { street: 'Rua Luis de Camoes' }
  ])

  assertFirstParseMatches('Rua Padre Cruz 31 3060-187 Cantanhede', [
    { street: 'Rua Padre Cruz' }, { housenumber: '31' },
    { postcode: '3060-187' }, { locality: 'Cantanhede' }
  ])

  assertFirstParseMatches('Tv. da Horta 27A', [
    { street: 'Tv. da Horta' }, { housenumber: '27A' }
  ])

  assertFirstParseMatches('R Academia das Ciências 17C 1200-030 Lisboa', [
    { street: 'R Academia das Ciências' }, { housenumber: '17C' },
    { postcode: '1200-030' }, { region: 'Lisboa' }
  ])

  assertFirstParseMatches('Rua do Sol a Santa Catarina 17B, 1200-452 Lisboa', [
    { street: 'Rua do Sol a Santa Catarina' }, { housenumber: '17B' },
    { postcode: '1200-452' }, { region: 'Lisboa' }
  ])

  assertFirstParseMatches('Tv. dos Fiéis de Deus 12C Lisboa Portugal', [
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
