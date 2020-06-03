const _ = require('lodash')
const CentralEuropeanStreetNameClassifier = require('./CentralEuropeanStreetNameClassifier')
const HouseNumberClassification = require('../classification/HouseNumberClassification')
const StreetClassification = require('../classification/StreetClassification')
const Span = require('../tokenization/Span')
const classifier = new CentralEuropeanStreetNameClassifier()

module.exports.tests = {}
module.exports.tests.classify = (test) => {
  let foo = new Span('Foo')
  let fooHouseNum = new Span('1', 4).classify(new HouseNumberClassification(1.0))
  foo.graph.add('next', fooHouseNum)

  let bar = new Span('Bar')
  let barHouseNum = new Span('2137', 4).classify(new HouseNumberClassification(1.0))
  bar.graph.add('next', barHouseNum)

  let baz = new Span('Baz')
  let bazHouseNum0 = new Span('152/160', 4).classify(new HouseNumberClassification(1.0))
  let bazHouseNum1 = new Span('152', 4).classify(new HouseNumberClassification(1.0))
  let bazHouseNum2 = new Span('160', 8).classify(new HouseNumberClassification(1.0))
  baz.graph.add('next', bazHouseNum0)
  baz.graph.add('next', bazHouseNum1)
  bazHouseNum1.graph.add('next', bazHouseNum2)

  // The Qux test case covers when the section has a greater length than
  // the tokens it contains, such as when it ends with whitespace.
  let qux = new Span('Qux')
  let quxHouseNum = new Span('1', 4).classify(new HouseNumberClassification(1.0))
  qux.graph.add('next', quxHouseNum)

  let valid = [
    new Span('Foo 1').setChildren([foo, fooHouseNum]),
    new Span('Bar 2137').setChildren([bar, barHouseNum]),
    new Span('Baz 152/160').setChildren([baz, bazHouseNum0, bazHouseNum1, bazHouseNum2]),
    new Span('Qux 1 ').setChildren([qux, quxHouseNum])
  ]

  valid.forEach(s => {
    test(`classify: ${s.body}`, (t) => {
      // run classifier
      classifier.each(s)

      // get children
      let children = s.graph.findAll('child')

      // first child should now be classified as a street
      t.deepEqual(_.first(children).classifications, {
        StreetClassification: new StreetClassification(0.5)
      }, `'${s.body}'`)

      // last child was unchanged
      _.tail(children).forEach(c => {
        t.deepEqual(c.classifications, {
          HouseNumberClassification: new HouseNumberClassification(1)
        })
      })

      t.end()
    })
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`CentralEuropeanStreetNameClassifier: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
