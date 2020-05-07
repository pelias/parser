const testcase = (test, common) => {
  let assertFirstMatch = common.assertFirstMatch(test)

  assertFirstMatch('École Paul Valéry Montpellier', [
    { place: 'École Paul Valéry' }, { locality: 'Montpellier' }
  ])

  assertFirstMatch('Université de Montpellier', [
    { place: 'Université de Montpellier' }
  ])

  assertFirstMatch('École Jules Vernes Villetaneuse', [
    { place: 'École Jules Vernes' }, { locality: 'Villetaneuse' }
  ])

  assertFirstMatch('ZAC de la Tuilerie, Villars-les-Dombes, France', [
    { place: 'ZAC de la Tuilerie' }, { locality: 'Villars-les-Dombes' }, { country: 'France' }
  ])

  assertFirstMatch('Bibliothèque François Mitterrand Paris', [
    { place: 'Bibliothèque François Mitterrand' }, { locality: 'Paris' }
  ])

  assertFirstMatch('ZI les grasses Péronnas', [
    { place: 'ZI les grasses' }, { locality: 'Péronnas' }
  ])

  assertFirstMatch('ZAC du Pré Polliat', [
    { place: 'ZAC du Pré' }, { locality: 'Polliat' }
  ])

  assertFirstMatch('ZAC sous la Combe Lavancia-Epercy', [
    { place: 'ZAC sous la Combe' }, { locality: 'Lavancia-Epercy' }
  ])

  assertFirstMatch('ZA Entraigues Embrun', [
    { place: 'ZA Entraigues' }, { locality: 'Embrun' }
  ])

  // This should be street in French, but it's ok
  assertFirstMatch('Place Sohier Vervins', [
    { street: 'Place Sohier' }, { locality: 'Vervins' }
  ])

  // This should be street in French, but it's ok
  assertFirstMatch('CC des Fours à Chaux Montluçon', [
    { street: 'CC des Fours à Chaux' }, { locality: 'Montluçon' }
  ])

  // This should be street in French, but it's ok
  assertFirstMatch('Parc Des Clots Upie', [
    { street: 'Parc Des Clots' }, { locality: 'Upie' }
  ])

  // Tthe place should be `ZAC du centre Bourg`
  assertFirstMatch('ZAC du centre Bourg Saint-Sébastien-De-Morsent', [
    { place: 'ZAC' }, { street: 'du centre' }, { locality: 'Saint-Sébastien-De-Morsent' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`place FRA: ${name}`, testFunction)
  }

  testcase(test, common)
}
