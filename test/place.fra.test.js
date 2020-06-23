const testcase = (test, common) => {
  let assert = common.assert(test)

  assert('École Paul Valéry Montpellier', [
    { venue: 'École Paul Valéry' }, { locality: 'Montpellier' }
  ])

  assert('Université de Montpellier', [
    { venue: 'Université de Montpellier' }
  ])

  assert('École Jules Vernes Villetaneuse', [
    { venue: 'École Jules Vernes' }, { locality: 'Villetaneuse' }
  ])

  assert('ZAC de la Tuilerie, Villars-les-Dombes, France', [
    { venue: 'ZAC de la Tuilerie' }, { locality: 'Villars-les-Dombes' }, { country: 'France' }
  ])

  assert('Bibliothèque François Mitterrand Paris', [
    { venue: 'Bibliothèque François Mitterrand' }, { locality: 'Paris' }
  ])

  assert('ZI les grasses Péronnas', [
    { venue: 'ZI les grasses' }, { locality: 'Péronnas' }
  ])

  assert('ZAC du Pré Polliat', [
    { venue: 'ZAC du Pré' }, { locality: 'Polliat' }
  ])

  assert('ZAC sous la Combe Lavancia-Epercy', [
    { venue: 'ZAC sous la Combe' }, { locality: 'Lavancia-Epercy' }
  ])

  assert('ZA Entraigues Embrun', [
    { venue: 'ZA Entraigues' }, { locality: 'Embrun' }
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

  // @todo: the place should be `ZAC du centre Bourg`
  assert('ZAC du centre Bourg Saint-Sébastien-De-Morsent', [
    { street: 'ZAC du centre' }, { locality: 'Saint-Sébastien-De-Morsent' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`place FRA: ${name}`, testFunction)
  }

  testcase(test, common)
}
