const testcase = (test, common) => {
  let assertFirstMatch = common.assertFirstMatch(test)

  assertFirstMatch('Rue Montmartre', [
    { street: 'Rue Montmartre' }
  ])

  assertFirstMatch('123 Rue Montmartre, Paris', [
    { housenumber: '123' }, { street: 'Rue Montmartre' }, { locality: 'Paris' }
  ])

  assertFirstMatch('Rue de Paris', [
    { street: 'Rue de Paris' }
  ])

  assertFirstMatch('Rue de la Paix', [
    { street: 'Rue de la Paix' }
  ])

  assertFirstMatch('Boulevard du Général Charles De Gaulle', [
    { street: 'Boulevard du Général Charles De Gaulle' }
  ])

  assertFirstMatch('11 Boulevard Saint Germains', [
    { housenumber: '11' }, { street: 'Boulevard Saint Germains' }
  ])

  assertFirstMatch('Rue Saint Anne', [
    { street: 'Rue Saint Anne' }
  ])

  assertFirstMatch('Boulevard Charles De Gaulle', [
    { street: 'Boulevard Charles De Gaulle' }
  ])

  assertFirstMatch('Allée Victor Hugo', [
    { street: 'Allée Victor Hugo' }
  ])

  assertFirstMatch('Avenue Aristide Briand', [
    { street: 'Avenue Aristide Briand' }
  ])

  assertFirstMatch('Rue Henri Barbusse Paris France', [
    { street: 'Rue Henri Barbusse' }, { locality: 'Paris' }, { country: 'France' }
  ])

  assertFirstMatch('Rue du Général Leclerc Dunkerque France', [
    { street: 'Rue du Général Leclerc' }, { locality: 'Dunkerque' }, { country: 'France' }
  ])

  assertFirstMatch('Avenue de Sainte Rose de Lima', [
    { street: 'Avenue de Sainte Rose de Lima' }
  ])

  assertFirstMatch('Rue du Capitaine Galinat Marseille France', [
    { street: 'Rue du Capitaine Galinat' }, { locality: 'Marseille' }, { country: 'France' }
  ])

  assertFirstMatch('Rue Jean Baptiste Clément', [
    { street: 'Rue Jean Baptiste Clément' }
  ])

  assertFirstMatch('Mery Sur Oise', [
    { locality: 'Mery Sur Oise' }
  ])

  assertFirstMatch('Méry Sur Oise', [
    { locality: 'Méry Sur Oise' }
  ])

  assertFirstMatch('Méry-Sur-Oise', [
    { locality: 'Méry-Sur-Oise' }
  ])

  assertFirstMatch('Mery-Sur-Oise', [
    { locality: 'Mery-Sur-Oise' }
  ])

  assertFirstMatch('4 Cité Du Cardinal Lemoine 75005 Paris', [
    { housenumber: '4' }, { street: 'Cité Du Cardinal Lemoine' }, { postcode: '75005' }, { locality: 'Paris' }
  ])

  assertFirstMatch('32 Rue Du 4 Septembre', [
    { housenumber: '32' }, { street: 'Rue Du 4 Septembre' }
  ])

  assertFirstMatch('12 Cité Roland Garros', [
    { housenumber: '12' }, { street: 'Cité Roland Garros' }
  ])

  assertFirstMatch(`Rue de l'Amiral Galache, Toulouse`, [
    { street: `Rue de l'Amiral Galache` }, { locality: 'Toulouse' }
  ])

  assertFirstMatch(`Rue de l'Inspecteur Alles Paris`, [
    { street: `Rue de l'Inspecteur Alles` }, { locality: 'Paris' }
  ])

  assertFirstMatch(`Rue de l'Empereur Julien Paris`, [
    { street: `Rue de l'Empereur Julien` }, { locality: 'Paris' }
  ])

  assertFirstMatch(`Rue de l'Adjudant Réau Paris`, [
    { street: `Rue de l'Adjudant Réau` }, { locality: 'Paris' }
  ])

  assertFirstMatch(`10 Boulevard Saint-Germains Paris`, [
    { housenumber: '10' }, { street: `Boulevard Saint-Germains` }, { locality: 'Paris' }
  ])

  assertFirstMatch(`Paris 75000, France`, [
    { locality: 'Paris' }, { postcode: '75000' }, { country: 'France' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address FRA: ${name}`, testFunction)
  }

  testcase(test, common)
}
