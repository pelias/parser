const testcase = (test, common) => {
  let assertFirstSolution = common.assertFirstSolution(test)

  assertFirstSolution('École Paul Valéry Montpellier', [
    { place: 'École Paul Valéry' }, { locality: 'Montpellier' }
  ])

  assertFirstSolution('Université de Montpellier', [
    { place: 'Université de Montpellier' }
  ])

  assertFirstSolution('École Jules Vernes Villetaneuse', [
    { place: 'École Jules Vernes' }, { locality: 'Villetaneuse' }
  ])

  assertFirstSolution('ZAC de la Tuilerie, Villars-les-Dombes, France', [
    { place: 'ZAC de la Tuilerie' }, { locality: 'Villars-les-Dombes' }, { country: 'France' }
  ])

  assertFirstSolution('Bibliothèque François Mitterrand Paris', [
    { place: 'Bibliothèque François Mitterrand' }, { locality: 'Paris' }
  ])

  assertFirstSolution('ZI les grasses Péronnas', [
    { place: 'ZI les grasses' }, { locality: 'Péronnas' }
  ])

  assertFirstSolution('ZAC du Pré Polliat', [
    { place: 'ZAC du Pré' }, { locality: 'Polliat' }
  ])

  assertFirstSolution('ZAC sous la Combe Lavancia-Epercy', [
    { place: 'ZAC sous la Combe' }, { locality: 'Lavancia-Epercy' }
  ])

  assertFirstSolution('ZA Entraigues Embrun', [
    { place: 'ZA Entraigues' }, { locality: 'Embrun' }
  ])

  // This should be street in French, but it's ok
  assertFirstSolution('Place Sohier Vervins', [
    { street: 'Place Sohier' }, { locality: 'Vervins' }
  ])

  // This should be street in French, but it's ok
  assertFirstSolution('CC des Fours à Chaux Montluçon', [
    { street: 'CC des Fours à Chaux' }, { locality: 'Montluçon' }
  ])

  // This should be street in French, but it's ok
  assertFirstSolution('Parc Des Clots Upie', [
    { street: 'Parc Des Clots' }, { locality: 'Upie' }
  ])

  // Tthe place should be `ZAC du centre Bourg`
  assertFirstSolution('ZAC du centre Bourg Saint-Sébastien-De-Morsent', [
    { place: 'ZAC' }, { street: 'du centre' }, { locality: 'Saint-Sébastien-De-Morsent' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`place FRA: ${name}`, testFunction)
  }

  testcase(test, common)
}
