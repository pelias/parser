const testcase = (test, common) => {
  let assert = common.assert(test)

  assert('École Paul Valéry Montpellier', [
    { place: 'École Paul Valéry' }, { locality: 'Montpellier' }
  ])

  assert('Université de Montpellier', [
    { place: 'Université de Montpellier' }
  ])

  assert('École Jules Vernes Villetaneuse', [
    { place: 'École Jules Vernes' }, { locality: 'Villetaneuse' }
  ])

  assert('ZAC de la Tuilerie, Villars-les-Dombes, France', [
    { place: 'ZAC de la Tuilerie' }, { locality: 'Villars-les-Dombes' }, { country: 'France' }
  ])

  assert('Bibliothèque François Mitterrand Paris', [
    { place: 'Bibliothèque François Mitterrand' }, { locality: 'Paris' }
  ])

  assert('ZI les grasses Péronnas', [
    { place: 'ZI les grasses' }, { locality: 'Péronnas' }
  ])

  assert('ZAC du Pré Polliat', [
    { place: 'ZAC du Pré' }, { locality: 'Polliat' }
  ])

  assert('ZAC sous la Combe Lavancia-Epercy', [
    { place: 'ZAC sous la Combe' }, { locality: 'Lavancia-Epercy' }
  ])

  assert('ZA Entraigues Embrun', [
    { place: 'ZA Entraigues' }, { locality: 'Embrun' }
  ])

  // This should be street in French, but it's ok
  assert('Place Sohier Vervins', [
    { street: 'Place Sohier' }, { locality: 'Vervins' }
  ])

  // This should be street in French, but it's ok
  assert('CC des Fours à Chaux Montluçon', [
    { street: 'CC des Fours à Chaux' }, { locality: 'Montluçon' }
  ])

  // This should be street in French, but it's ok
  assert('Parc Des Clots Upie', [
    { street: 'Parc Des Clots' }, { locality: 'Upie' }
  ])

  // Tthe place should be `ZAC du centre Bourg`
  assert('ZAC du centre Bourg Saint-Sébastien-De-Morsent', [
    { place: 'ZAC' }, { street: 'du centre' }, { locality: 'Saint-Sébastien-De-Morsent' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`place FRA: ${name}`, testFunction)
  }

  testcase(test, common)
}
