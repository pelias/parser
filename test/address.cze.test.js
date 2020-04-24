const testcase = (test, common) => {
  let assert = common.assert(test)

  assert('Korunní 810, Praha', [
    { street: 'Korunní' }, { housenumber: '810' },
    { locality: 'Praha' }
  ])

  assert('Kájovská 68, Český Krumlov', [
    { street: 'Kájovská' }, { housenumber: '68' },
    { locality: 'Český Krumlov' }
  ])

  assert('Beethovenova 641/9, Brno', [
    { street: 'Beethovenova' }, { housenumber: '641/9' },
    { locality: 'Brno' }
  ])

  // assert('Ostrava, U Koupaliště 1570/10', [
  //   { street: 'U Koupaliště' }, { housenumber: '1570/10' },
  //   { locality: 'Ostrava' }
  // ])

  // assert('Hradec Králové, Karla Čapka 694/5', [
  //   { street: 'Karla Čapka' }, { housenumber: '694/5' },
  //   { locality: 'Hradec Králové' }
  // ])

  // assert('Kolín, Pražská 3', [
  //   { street: 'Pražská' }, { housenumber: '3' },
  //   { locality: 'Kolín' }
  // ])

  // assert('Neratovice, Jungmannova 676', [
  //   { street: 'Jungmannova' }, { housenumber: '676' },
  //   { locality: 'Neratovice' }
  // ])

  // assert('Králíky, Bedřicha Smetany 561', [
  //   { street: 'Bedřicha Smetany' }, { housenumber: '561' },
  //   { locality: 'Králíky' }
  // ])

  // assert('Prachatice, Dlouhá 93', [
  //   { street: 'Dlouhá' }, { housenumber: '93' },
  //   { locality: 'Prachatice' }
  // ])

  // assert('Ronov nad Doubravou, Nábřežní 180', [
  //   { street: 'Nábřežní' }, { housenumber: '180' },
  //   { locality: 'Ronov nad Doubravou' }
  // ])

  // assert('Brno, Orlí 517/22', [
  //   { street: 'Orlí' }, { housenumber: '517/22' },
  //   { locality: 'Brno' }
  // ])

  // assert('Nový Jičín, Dvořákova 713/11', [
  //   { street: 'Dvořákova' }, { housenumber: '713/11' },
  //   { locality: 'Nový Jičín' }
  // ])

  // assert('Praha, V Šáreckém údolí 53/27', [
  //   { street: 'V Šáreckém údolí' }, { housenumber: '53/27' },
  //   { locality: 'Praha' }
  // ])

  // assert('Praha, Nad Panenskou 164/4', [
  //   { street: 'Nad Panenskou' }, { housenumber: '164/4' },
  //   { locality: 'Praha' }
  // ])

  // assert('Rožmitál pod Třemšínem, Kpt. Jaroše 403', [
  //   { street: 'Kpt. Jaroše' }, { housenumber: '403' },
  //   { locality: 'Rožmitál pod Třemšínem' }
  // ])

  // assert('Klatovy, Jiráskova 15', [
  //   { street: 'Jiráskova' }, { housenumber: '15' },
  //   { locality: 'Klatovy' }
  // ])

  // assert('Frýdek-Místek, Radniční 1244', [
  //   { street: 'Radniční' }, { housenumber: '1244' },
  //   { locality: 'Frýdek-Místek' }
  // ])

  // assert('Zlín, Rašínova 70', [
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
