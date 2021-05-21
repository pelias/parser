const testcase = (test, common) => {
  let assert = common.assert(test)

  // intersection queries

  // intersection tokens as a prefix are currently unsupported
  // assert('Corner of Main St & Second Ave', [
  //   { street: 'Main St' }, { street: 'Second Ave' }
  // ])
  // assert('cnr west st and north ave', [
  //   { street: 'west st' }, { street: 'north ave' }
  // ])

  assert('Main St & Second Ave', [
    { street: 'Main St' }, { street: 'Second Ave' }
  ])

  assert('Main St @ Second Ave', [
    { street: 'Main St' }, { street: 'Second Ave' }
  ])

  assert('Main St and Second Ave', [
    { street: 'Main St' }, { street: 'Second Ave' }
  ])

  assert('12th Avenue and California Street', [
    { street: '12th Avenue' }, { street: 'California Street' }
  ])

  assert('15th Avenue and Fulton Street', [
    { street: '15th Avenue' }, { street: 'Fulton Street' }
  ])

  assert('17th Avenue & Anza Street', [
    { street: '17th Avenue' }, { street: 'Anza Street' }
  ])

  assert('Gleimstraße an der ecke von Schönhauser Allee', [
    { street: 'Gleimstraße' }, { street: 'Schönhauser Allee' }
  ])

  assert('Gleimstraße und Schönhauserallee', [
    { street: 'Gleimstraße' }, { street: 'Schönhauserallee' }
  ])

  // should not consider intersection tokens for street name
  assert('& b', [], false)
  assert('@ b', [], false)
  assert('at b', [], false)
  assert('a &', [], false)
  assert('a @', [], false)
  assert('a at', [], false)
  assert('& street', [], false)
  assert('@ street', [], false)
  assert('carrer &', [], false)
  assert('carrer @', [], false)

  // should correctly parse street names containing an intersection token
  assert('at street', [{ street: 'at street' }])
  assert('corner street', [{ street: 'corner street' }])
  assert('carrer en', [{ street: 'carrer en' }])
  assert('carrer con', [{ street: 'carrer con' }])

  // no street suffix
  assert('foo & bar', [
    { street: 'foo' }, { street: 'bar' }
  ])
  assert('foo and bar', [
    { street: 'foo' }, { street: 'bar' }
  ])
  assert('foo at bar', [
    { street: 'foo' }, { street: 'bar' }
  ])
  assert('foo @ bar', [
    { street: 'foo' }, { street: 'bar' }
  ])

  // missing street suffix - alpha
  assert('main st & side ave', [
    { street: 'main st' }, { street: 'side ave' }
  ])
  assert('main st & side', [
    { street: 'main st' }, { street: 'side' }
  ])
  assert('main & side ave', [
    { street: 'main' }, { street: 'side ave' }
  ])
  assert('main & side', [
    { street: 'main' }, { street: 'side' }
  ])

  // missing street suffix - ordinal
  assert('1st st & 2nd ave', [
    { street: '1st st' }, { street: '2nd ave' }
  ])
  assert('1st st & 2nd', [
    { street: '1st st' }, { street: '2nd' }
  ])
  assert('1st & 2nd ave', [
    { street: '1st' }, { street: '2nd ave' }
  ])
  assert('1st & 2nd', [
    { street: '1st' }, { street: '2nd' }
  ])

  // missing street suffix - cardinal
  assert('1 st & 2 ave', [
    { street: '1 st' }, { street: '2 ave' }
  ])
  assert('1 st & 2', [
    { street: '1 st' }, { street: '2' }
  ])
  assert('1 & 2 ave', [
    { street: '1' }, { street: '2 ave' }
  ])
  assert('1 & 2', [
    { street: '1' }, { street: '2' }
  ])

  assert('SW 6th & Pine', [
    { street: 'SW 6th' }, { street: 'Pine' }
  ])

  assert('9th and Lambert', [
    { street: '9th' }, { street: 'Lambert' }
  ])

  assert('filbert & 32nd', [
    { street: 'filbert' }, { street: '32nd' }
  ])

  // Should not detect this as an intersection
  // assert('University of Hawaii at Hilo', [
  //   { street: 'SW 6th' }, { street: 'Pine' }
  // ])
  assert('national air and space museum', [
    { venue: 'national air and space museum' }
  ])

  // Trimet syntax
  // assert('9,Lambert', [
  //   { street: '9' }, { street: 'Lambert' }
  // ])

  // real-world test cases
  assert('Oak St At 16th St, Paso Robles, CA 93446, USA', [
    { street: 'Oak St' }, { street: '16th St' },
    { locality: 'Paso Robles' }, { region: 'CA' },
    { postcode: '93446' }, { country: 'USA' }
  ])
  assert('N State St At E Grand Ave, Chicago, IL 60654, USA', [
    { street: 'N State St' }, { street: 'E Grand Ave' },
    { locality: 'Chicago' }, { region: 'IL' },
    { postcode: '60654' }, { country: 'USA' }
  ])
  assert('E Illinois St At N State St, Chicago, IL 60611, USA', [
    { street: 'E Illinois St' }, { street: 'N State St' },
    { locality: 'Chicago' }, { region: 'IL' },
    { postcode: '60611' }, { country: 'USA' }
  ])
  assert('112th St E At 17th St Sw, Puyallup, WA 98373, USA', [
    { street: '112th St E' }, { street: '17th St Sw' },
    { locality: 'Puyallup' }, { region: 'WA' },
    { postcode: '98373' }, { country: 'USA' }
  ])
  assert('Sw 152nd Ave At Sw 280th St, Naranja, FL 33032, USA', [
    { street: 'Sw 152nd Ave' }, { street: 'Sw 280th St' },
    { locality: 'Naranja' }, { region: 'FL' },
    { postcode: '33032' }, { country: 'USA' }
  ])
  assert('Stonecroft Blvd At Westfields Blvd, Chantilly, VA 20152, USA', [
    { street: 'Stonecroft Blvd' }, { street: 'Westfields Blvd' },
    { locality: 'Chantilly' }, { region: 'VA' },
    { postcode: '20152' }, { country: 'USA' }
  ])
  assert('Hennepin Ave At S 3rd St, Minneapolis, MN 55401, USA', [
    { street: 'Hennepin Ave' }, { street: 'S 3rd St' },
    { locality: 'Minneapolis' }, { region: 'MN' },
    { postcode: '55401' }, { country: 'USA' }
  ])
  // assert('S 00 Ew At E 400 S, Kokomo, IN 46902, USA', [
  //   { street: 'S 00 Ew' }, { street: 'E 400 S' },
  //   { locality: 'Kokomo' }, { region: 'IN' },
  //   { postcode: '46902' }, { country: 'USA' }
  // ])
  assert('Sylvester Hwy At Branch Rd, Albany, GA 31705, USA', [
    { street: 'Sylvester Hwy' }, { street: 'Branch Rd' },
    { locality: 'Albany' }, { region: 'GA' },
    { postcode: '31705' }, { country: 'USA' }
  ])
  assert('E Riverside Dr At Montopolis Dr, Austin, TX 78741, USA', [
    { street: 'E Riverside Dr' }, { street: 'Montopolis Dr' },
    { locality: 'Austin' }, { region: 'TX' },
    { postcode: '78741' }, { country: 'USA' }
  ])
  assert('E Riverside Dr At Wickersham Ln, Austin, TX 78741, USA', [
    { street: 'E Riverside Dr' }, { street: 'Wickersham Ln' },
    { locality: 'Austin' }, { region: 'TX' },
    { postcode: '78741' }, { country: 'USA' }
  ])
  assert('Red River St At E Cesar Chavez St, Austin, TX 78701, USA', [
    { street: 'Red River St' }, { street: 'E Cesar Chavez St' },
    { locality: 'Austin' }, { region: 'TX' },
    { postcode: '78701' }, { country: 'USA' }
  ])
  assert('N Wells St At W Division St, Chicago, IL 60610, USA', [
    { street: 'N Wells St' }, { street: 'W Division St' },
    { locality: 'Chicago' }, { region: 'IL' },
    { postcode: '60610' }, { country: 'USA' }
  ])
  // assert('Akers Mill Rd At Riverbend Club Dr Se, Atlanta, GA 30339, USA', [
  // { street: 'Akers Mill Rd' }, { street: 'Riverbend Club Dr Se' },
  // { locality: 'Atlanta' }, { region: 'GA' },
  // { postcode: '30339' }, { country: 'USA' }
  // ])
  assert('Wiederstein Rd At Fm 3009, Schertz, TX 78154, USA', [
    { street: 'Wiederstein Rd' }, { street: 'Fm 3009' },
    { locality: 'Schertz' }, { region: 'TX' },
    { postcode: '78154' }, { country: 'USA' }
  ])
  assert('Kingston Pike At Granite Dr, Circleville, OH 43113, USA', [
    { street: 'Kingston Pike' }, { street: 'Granite Dr' },
    { locality: 'Circleville' }, { region: 'OH' },
    { postcode: '43113' }, { country: 'USA' }
  ])
  assert('Manor Rd At Airport Blvd, Austin, TX 78722, USA', [
    { street: 'Manor Rd' }, { street: 'Airport Blvd' },
    { locality: 'Austin' }, { region: 'TX' },
    { postcode: '78722' }, { country: 'USA' }
  ])
  assert('S Interstate 35 At E William Cannon Dr, Austin, TX 78744, USA', [
    { street: 'S Interstate 35' }, { street: 'E William Cannon Dr' },
    { locality: 'Austin' }, { region: 'TX' },
    { postcode: '78744' }, { country: 'USA' }
  ])
  assert('E Riverside Dr At Burton Dr, Austin, TX 78741, USA', [
    { street: 'E Riverside Dr' }, { street: 'Burton Dr' },
    { locality: 'Austin' }, { region: 'TX' },
    { postcode: '78741' }, { country: 'USA' }
  ])
  assert('Napier Field Rd At Scott Rd, Dothan, AL 36303, USA', [
    { street: 'Napier Field Rd' }, { street: 'Scott Rd' },
    { locality: 'Dothan' }, { region: 'AL' },
    { postcode: '36303' }, { country: 'USA' }
  ])
  assert('16th St At H St, Sacramento, CA 95814, USA', [
    { street: '16th St' }, { street: 'H St' },
    { locality: 'Sacramento' }, { region: 'CA' },
    { postcode: '95814' }, { country: 'USA' }
  ])
  assert('N Halsted St At W Lake St, Chicago, IL 60661, USA', [
    { street: 'N Halsted St' }, { street: 'W Lake St' },
    { locality: 'Chicago' }, { region: 'IL' },
    { postcode: '60661' }, { country: 'USA' }
  ])
  assert('College Park Dr At Gosling Rd, Conroe, TX 77384, USA', [
    { street: 'College Park Dr' }, { street: 'Gosling Rd' },
    { locality: 'Conroe' }, { region: 'TX' },
    { postcode: '77384' }, { country: 'USA' }
  ])
  assert('Hall Ave At N Cherry St, Wallingford, CT 06492, USA', [
    { street: 'Hall Ave' }, { street: 'N Cherry St' },
    { locality: 'Wallingford' }, { region: 'CT' },
    { postcode: '06492' }, { country: 'USA' }
  ])
  assert('Pinemont Dr At N Shepherd Dr, Houston, TX 77018, USA', [
    { street: 'Pinemont Dr' }, { street: 'N Shepherd Dr' },
    { locality: 'Houston' }, { region: 'TX' },
    { postcode: '77018' }, { country: 'USA' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`intersection: ${name}`, testFunction)
  }

  testcase(test, common)
}
