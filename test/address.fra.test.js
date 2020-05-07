const testcase = (test, common) => {
  let assertFirstParseMatches = common.assertFirstParseMatches(test)

  assertFirstParseMatches('Rue Montmartre', [
    { street: 'Rue Montmartre' }
  ])

  assertFirstParseMatches('123 Rue Montmartre, Paris', [
    { housenumber: '123' }, { street: 'Rue Montmartre' }, { locality: 'Paris' }
  ])

  assertFirstParseMatches('Rue de Paris', [
    { street: 'Rue de Paris' }
  ])

  assertFirstParseMatches('Rue de la Paix', [
    { street: 'Rue de la Paix' }
  ])

  assertFirstParseMatches('Boulevard du Général Charles De Gaulle', [
    { street: 'Boulevard du Général Charles De Gaulle' }
  ])

  assertFirstParseMatches('11 Boulevard Saint Germains', [
    { housenumber: '11' }, { street: 'Boulevard Saint Germains' }
  ])

  assertFirstParseMatches('Rue Saint Anne', [
    { street: 'Rue Saint Anne' }
  ])

  assertFirstParseMatches('Boulevard Charles De Gaulle', [
    { street: 'Boulevard Charles De Gaulle' }
  ])

  assertFirstParseMatches('Allée Victor Hugo', [
    { street: 'Allée Victor Hugo' }
  ])

  assertFirstParseMatches('Avenue Aristide Briand', [
    { street: 'Avenue Aristide Briand' }
  ])

  assertFirstParseMatches('Rue Henri Barbusse Paris France', [
    { street: 'Rue Henri Barbusse' }, { locality: 'Paris' }, { country: 'France' }
  ])

  assertFirstParseMatches('Rue du Général Leclerc Dunkerque France', [
    { street: 'Rue du Général Leclerc' }, { locality: 'Dunkerque' }, { country: 'France' }
  ])

  assertFirstParseMatches('Avenue de Sainte Rose de Lima', [
    { street: 'Avenue de Sainte Rose de Lima' }
  ])

  assertFirstParseMatches('Rue du Capitaine Galinat Marseille France', [
    { street: 'Rue du Capitaine Galinat' }, { locality: 'Marseille' }, { country: 'France' }
  ])

  assertFirstParseMatches('Rue Jean Baptiste Clément', [
    { street: 'Rue Jean Baptiste Clément' }
  ])

  assertFirstParseMatches('Mery Sur Oise', [
    { locality: 'Mery Sur Oise' }
  ])

  assertFirstParseMatches('Méry Sur Oise', [
    { locality: 'Méry Sur Oise' }
  ])

  assertFirstParseMatches('Méry-Sur-Oise', [
    { locality: 'Méry-Sur-Oise' }
  ])

  assertFirstParseMatches('Mery-Sur-Oise', [
    { locality: 'Mery-Sur-Oise' }
  ])

  assertFirstParseMatches('4 Cité Du Cardinal Lemoine 75005 Paris', [
    { housenumber: '4' }, { street: 'Cité Du Cardinal Lemoine' }, { postcode: '75005' }, { locality: 'Paris' }
  ])

  assertFirstParseMatches('32 Rue Du 4 Septembre', [
    { housenumber: '32' }, { street: 'Rue Du 4 Septembre' }
  ])

  assertFirstParseMatches('12 Cité Roland Garros', [
    { housenumber: '12' }, { street: 'Cité Roland Garros' }
  ])

  assertFirstParseMatches(`Rue de l'Amiral Galache, Toulouse`, [
    { street: `Rue de l'Amiral Galache` }, { locality: 'Toulouse' }
  ])

  assertFirstParseMatches(`Rue de l'Inspecteur Alles Paris`, [
    { street: `Rue de l'Inspecteur Alles` }, { locality: 'Paris' }
  ])

  assertFirstParseMatches(`Rue de l'Empereur Julien Paris`, [
    { street: `Rue de l'Empereur Julien` }, { locality: 'Paris' }
  ])

  assertFirstParseMatches(`Rue de l'Adjudant Réau Paris`, [
    { street: `Rue de l'Adjudant Réau` }, { locality: 'Paris' }
  ])

  assertFirstParseMatches(`10 Boulevard Saint-Germains Paris`, [
    { housenumber: '10' }, { street: `Boulevard Saint-Germains` }, { locality: 'Paris' }
  ])

  assertFirstParseMatches(`Paris 75000, France`, [
    { locality: 'Paris' }, { postcode: '75000' }, { country: 'France' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address FRA: ${name}`, testFunction)
  }

  testcase(test, common)
}
