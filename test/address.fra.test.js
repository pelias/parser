const testcase = (test, common) => {
  let assertFirstSolution = common.assertFirstSolution(test)

  assertFirstSolution('Rue Montmartre', [
    { street: 'Rue Montmartre' }
  ])

  assertFirstSolution('123 Rue Montmartre, Paris', [
    { housenumber: '123' }, { street: 'Rue Montmartre' }, { locality: 'Paris' }
  ])

  assertFirstSolution('Rue de Paris', [
    { street: 'Rue de Paris' }
  ])

  assertFirstSolution('Rue de la Paix', [
    { street: 'Rue de la Paix' }
  ])

  assertFirstSolution('Boulevard du Général Charles De Gaulle', [
    { street: 'Boulevard du Général Charles De Gaulle' }
  ])

  assertFirstSolution('11 Boulevard Saint Germains', [
    { housenumber: '11' }, { street: 'Boulevard Saint Germains' }
  ])

  assertFirstSolution('Rue Saint Anne', [
    { street: 'Rue Saint Anne' }
  ])

  assertFirstSolution('Boulevard Charles De Gaulle', [
    { street: 'Boulevard Charles De Gaulle' }
  ])

  assertFirstSolution('Allée Victor Hugo', [
    { street: 'Allée Victor Hugo' }
  ])

  assertFirstSolution('Avenue Aristide Briand', [
    { street: 'Avenue Aristide Briand' }
  ])

  assertFirstSolution('Rue Henri Barbusse Paris France', [
    { street: 'Rue Henri Barbusse' }, { locality: 'Paris' }, { country: 'France' }
  ])

  assertFirstSolution('Rue du Général Leclerc Dunkerque France', [
    { street: 'Rue du Général Leclerc' }, { locality: 'Dunkerque' }, { country: 'France' }
  ])

  assertFirstSolution('Avenue de Sainte Rose de Lima', [
    { street: 'Avenue de Sainte Rose de Lima' }
  ])

  assertFirstSolution('Rue du Capitaine Galinat Marseille France', [
    { street: 'Rue du Capitaine Galinat' }, { locality: 'Marseille' }, { country: 'France' }
  ])

  assertFirstSolution('Rue Jean Baptiste Clément', [
    { street: 'Rue Jean Baptiste Clément' }
  ])

  assertFirstSolution('Mery Sur Oise', [
    { locality: 'Mery Sur Oise' }
  ])

  assertFirstSolution('Méry Sur Oise', [
    { locality: 'Méry Sur Oise' }
  ])

  assertFirstSolution('Méry-Sur-Oise', [
    { locality: 'Méry-Sur-Oise' }
  ])

  assertFirstSolution('Mery-Sur-Oise', [
    { locality: 'Mery-Sur-Oise' }
  ])

  assertFirstSolution('4 Cité Du Cardinal Lemoine 75005 Paris', [
    { housenumber: '4' }, { street: 'Cité Du Cardinal Lemoine' }, { postcode: '75005' }, { locality: 'Paris' }
  ])

  assertFirstSolution('32 Rue Du 4 Septembre', [
    { housenumber: '32' }, { street: 'Rue Du 4 Septembre' }
  ])

  assertFirstSolution('12 Cité Roland Garros', [
    { housenumber: '12' }, { street: 'Cité Roland Garros' }
  ])

  assertFirstSolution(`Rue de l'Amiral Galache, Toulouse`, [
    { street: `Rue de l'Amiral Galache` }, { locality: 'Toulouse' }
  ])

  assertFirstSolution(`Rue de l'Inspecteur Alles Paris`, [
    { street: `Rue de l'Inspecteur Alles` }, { locality: 'Paris' }
  ])

  assertFirstSolution(`Rue de l'Empereur Julien Paris`, [
    { street: `Rue de l'Empereur Julien` }, { locality: 'Paris' }
  ])

  assertFirstSolution(`Rue de l'Adjudant Réau Paris`, [
    { street: `Rue de l'Adjudant Réau` }, { locality: 'Paris' }
  ])

  assertFirstSolution(`10 Boulevard Saint-Germains Paris`, [
    { housenumber: '10' }, { street: `Boulevard Saint-Germains` }, { locality: 'Paris' }
  ])

  assertFirstSolution(`Paris 75000, France`, [
    { locality: 'Paris' }, { postcode: '75000' }, { country: 'France' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address FRA: ${name}`, testFunction)
  }

  testcase(test, common)
}
