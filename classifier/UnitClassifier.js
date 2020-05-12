const WordClassifier = require('./super/WordClassifier')
const UnitClassification = require('../classification/UnitClassification')

class UnitClassifier extends WordClassifier {
  each (span) {
    const prev = span.graph.findOne('prev')
    const hasPrevUnitToken = prev && prev.classifications.hasOwnProperty('UnitTypeClassification')

    // all numbers or a single letter need to follow a unit type to be a unit
    // ex: suite a, apt 22
    if (
      hasPrevUnitToken && (
        // all numbers
        /^#?\d+$/.test(span.body) ||
        // single letter
        /^#?[A-Za-z]$/.test(span.body) ||
        // numbers followed by letter
        /^#?\d+[A-Za-z]$/.test(span.body) ||
        // letter followed by numbers
        /^#?[A-Za-z]\d+$/.test(span.body)
      )
    ) {
      span.classify(new UnitClassification(1))
    }
  }
}

module.exports = UnitClassifier
