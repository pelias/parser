const testcase = (test, common) => {
  let assertFirstParseMatches = common.assertFirstParseMatches(test)

  assertFirstParseMatches('École Paul Valéry Montpellier', [
    { place: 'École Paul Valéry' }, { locality: 'Montpellier' }
  ])

  assertFirstParseMatches('Université de Montpellier', [
    { place: 'Université de Montpellier' }
  ])

  assertFirstParseMatches('École Jules Vernes Villetaneuse', [
    { place: 'École Jules Vernes' }, { locality: 'Villetaneuse' }
  ])

  assertFirstParseMatches('ZAC de la Tuilerie, Villars-les-Dombes, France', [
    { place: 'ZAC de la Tuilerie' }, { locality: 'Villars-les-Dombes' }, { country: 'France' }
  ])

  assertFirstParseMatches('Bibliothèque François Mitterrand Paris', [
    { place: 'Bibliothèque François Mitterrand' }, { locality: 'Paris' }
  ])

  assertFirstParseMatches('ZI les grasses Péronnas', [
    { place: 'ZI les grasses' }, { locality: 'Péronnas' }
  ])

  assertFirstParseMatches('ZAC du Pré Polliat', [
    { place: 'ZAC du Pré' }, { locality: 'Polliat' }
  ])

  assertFirstParseMatches('ZAC sous la Combe Lavancia-Epercy', [
    { place: 'ZAC sous la Combe' }, { locality: 'Lavancia-Epercy' }
  ])

  assertFirstParseMatches('ZA Entraigues Embrun', [
    { place: 'ZA Entraigues' }, { locality: 'Embrun' }
  ])

  // This should be street in French, but it's ok
  assertFirstParseMatches('Place Sohier Vervins', [
    { street: 'Place Sohier' }, { locality: 'Vervins' }
  ])

  // This should be street in French, but it's ok
  assertFirstParseMatches('CC des Fours à Chaux Montluçon', [
    { street: 'CC des Fours à Chaux' }, { locality: 'Montluçon' }
  ])

  // This should be street in French, but it's ok
  assertFirstParseMatches('Parc Des Clots Upie', [
    { street: 'Parc Des Clots' }, { locality: 'Upie' }
  ])

  // Tthe place should be `ZAC du centre Bourg`
  assertFirstParseMatches('ZAC du centre Bourg Saint-Sébastien-De-Morsent', [
    { place: 'ZAC' }, { street: 'du centre' }, { locality: 'Saint-Sébastien-De-Morsent' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`place FRA: ${name}`, testFunction)
  }

  testcase(test, common)
}
