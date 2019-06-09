const AddressParser = require('../parser/AddressParser')

const testcase = (test, common) => {
  let parser = new AddressParser()
  let assert = common.assert.bind(null, test, parser)

  assert('Rue Montmartre', [
    { street: 'Rue Montmartre' }
  ], true)

  assert('123 Rue Montmartre, Paris', [
    { housenumber: '123' }, { street: 'Rue Montmartre' }, { locality: 'Paris' }
  ], true)

  assert('Rue de Paris', [
    { street: 'Rue de Paris' }
  ], true)

  assert('Rue de la Paix', [
    { street: 'Rue de la Paix' }
  ], true)

  assert('Boulevard du Général Charles De Gaulle', [
    { street: 'Boulevard du Général Charles De Gaulle' }
  ], true)

  assert('11 Boulevard Saint Germains', [
    { housenumber: '11' }, { street: 'Boulevard Saint Germains' }
  ], true)

  assert('Rue Saint Anne', [
    { street: 'Rue Saint Anne' }
  ], true)

  assert('Boulevard Charles De Gaulle', [
    { street: 'Boulevard Charles De Gaulle' }
  ], true)

  assert('Allée Victor Hugo', [
    { street: 'Allée Victor Hugo' }
  ], true)

  assert('Avenue Aristide Briand', [
    { street: 'Avenue Aristide Briand' }
  ], true)

  assert('Rue Henri Barbusse Paris France', [
    { street: 'Rue Henri Barbusse' }, { locality: 'Paris' }, { country: 'France' }
  ], true)

  assert('Rue du Général Leclerc Dunkerque France', [
    { street: 'Rue du Général Leclerc' }, { locality: 'Dunkerque' }, { country: 'France' }
  ], true)

  assert('Avenue de Sainte Rose de Lima', [
    { street: 'Avenue de Sainte Rose de Lima' }
  ], true)

  assert('Rue du Capitaine Galinat Marseille France', [
    { street: 'Rue du Capitaine Galinat' }, { locality: 'Marseille' }, { country: 'France' }
  ], true)

  assert('Rue Jean Baptiste Clément', [
    { street: 'Rue Jean Baptiste Clément' }
  ], true)

  assert('Mery Sur Oise', [
    { locality: 'Mery Sur Oise' }
  ], true)

  assert('Méry Sur Oise', [
    { locality: 'Méry Sur Oise' }
  ], true)

  assert('Méry-Sur-Oise', [
    { locality: 'Méry-Sur-Oise' }
  ], true)

  assert('Mery-Sur-Oise', [
    { locality: 'Mery-Sur-Oise' }
  ], true)

  assert('4 Cité Du Cardinal Lemoine 75005 Paris', [
    { housenumber: '4' }, { street: 'Cité Du Cardinal Lemoine' }, { postcode: '75005' }, { locality: 'Paris' }
  ], true)

  assert('32 Rue Du 4 Septembre', [
    { housenumber: '32' }, { street: 'Rue Du 4 Septembre' }
  ], true)

  assert('12 Cité Roland Garros', [
    { housenumber: '12' }, { street: 'Cité Roland Garros' }
  ], true)
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address FRA: ${name}`, testFunction)
  }

  testcase(test, common)
}
