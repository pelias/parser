const _ = require('lodash')
const CentralEuropeanStreetNameClassifier = require('./CentralEuropeanStreetNameClassifier')
const HouseNumberClassification = require('../classification/HouseNumberClassification')
const StreetClassification = require('../classification/StreetClassification')
const Span = require('../tokenization/Span')
const classifier = new CentralEuropeanStreetNameClassifier()

module.exports.tests = {}
module.exports.tests.classify = (test) => {
  let valid = [
    new Span('Foo 1').setChildren([
      new Span('Foo'),
      new Span('1').classify(new HouseNumberClassification(1.0))
    ]),
    new Span('Bar 2137').setChildren([
      new Span('Bar'),
      new Span('2137').classify(new HouseNumberClassification(1.0))
    ])
  ]

  valid.forEach(s => {
    test(`classify: ${s.body}`, (t) => {
      // run classifier
      classifier.each(s, null, 1)

      // get children
      let children = s.graph.findAll('child')

      // first child should now be classified as a street
      t.deepEqual(_.first(children).classifications, {
        StreetClassification: new StreetClassification(0.5)
      })

      // last child was unchanged
      t.deepEqual(_.last(children).classifications, {
        HouseNumberClassification: new HouseNumberClassification(1)
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
