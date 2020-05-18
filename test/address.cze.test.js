const testcase = (test, common) => {
  let assertFirstSolution = common.assertFirstSolution(test)

  assertFirstSolution('Korunní 810, Praha', [
    { street: 'Korunní' }, { housenumber: '810' },
    { locality: 'Praha' }
  ])

  assertFirstSolution('Kájovská 68, Český Krumlov', [
    { street: 'Kájovská' }, { housenumber: '68' },
    { locality: 'Český Krumlov' }
  ])

  assertFirstSolution('Beethovenova 641/9, Brno', [
    { street: 'Beethovenova' }, { housenumber: '641/9' },
    { locality: 'Brno' }
  ])

  // assertFirstSolution('Ostrava, U Koupaliště 1570/10', [
  //   { street: 'U Koupaliště' }, { housenumber: '1570/10' },
  //   { locality: 'Ostrava' }
  // ])

  // assertFirstSolution('Hradec Králové, Karla Čapka 694/5', [
  //   { street: 'Karla Čapka' }, { housenumber: '694/5' },
  //   { locality: 'Hradec Králové' }
  // ])

  // assertFirstSolution('Kolín, Pražská 3', [
  //   { street: 'Pražská' }, { housenumber: '3' },
  //   { locality: 'Kolín' }
  // ])

  // assertFirstSolution('Neratovice, Jungmannova 676', [
  //   { street: 'Jungmannova' }, { housenumber: '676' },
  //   { locality: 'Neratovice' }
  // ])

  // assertFirstSolution('Králíky, Bedřicha Smetany 561', [
  //   { street: 'Bedřicha Smetany' }, { housenumber: '561' },
  //   { locality: 'Králíky' }
  // ])

  // assertFirstSolution('Prachatice, Dlouhá 93', [
  //   { street: 'Dlouhá' }, { housenumber: '93' },
  //   { locality: 'Prachatice' }
  // ])

  // assertFirstSolution('Ronov nad Doubravou, Nábřežní 180', [
  //   { street: 'Nábřežní' }, { housenumber: '180' },
  //   { locality: 'Ronov nad Doubravou' }
  // ])

  // assertFirstSolution('Brno, Orlí 517/22', [
  //   { street: 'Orlí' }, { housenumber: '517/22' },
  //   { locality: 'Brno' }
  // ])

  // assertFirstSolution('Nový Jičín, Dvořákova 713/11', [
  //   { street: 'Dvořákova' }, { housenumber: '713/11' },
  //   { locality: 'Nový Jičín' }
  // ])

  // assertFirstSolution('Praha, V Šáreckém údolí 53/27', [
  //   { street: 'V Šáreckém údolí' }, { housenumber: '53/27' },
  //   { locality: 'Praha' }
  // ])

  // assertFirstSolution('Praha, Nad Panenskou 164/4', [
  //   { street: 'Nad Panenskou' }, { housenumber: '164/4' },
  //   { locality: 'Praha' }
  // ])

  // assertFirstSolution('Rožmitál pod Třemšínem, Kpt. Jaroše 403', [
  //   { street: 'Kpt. Jaroše' }, { housenumber: '403' },
  //   { locality: 'Rožmitál pod Třemšínem' }
  // ])

  // assertFirstSolution('Klatovy, Jiráskova 15', [
  //   { street: 'Jiráskova' }, { housenumber: '15' },
  //   { locality: 'Klatovy' }
  // ])

  // assertFirstSolution('Frýdek-Místek, Radniční 1244', [
  //   { street: 'Radniční' }, { housenumber: '1244' },
  //   { locality: 'Frýdek-Místek' }
  // ])

  // assertFirstSolution('Zlín, Rašínova 70', [
  //   { street: 'Rašínova' }, { housenumber: '70' },
  //   { locality: 'Zlín' }
  // ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`address CZEs: ${name}`, testFunction)
  }

  testcase(test, common)
}
