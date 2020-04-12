const WordClassifier = require('./super/WordClassifier')
const UnitClassification = require('../classification/UnitClassification')

class UnitClassifier extends WordClassifier {
  each (span) {
    // skip spans which do not contain numbers
    if (!span.contains.numerals) { return }

    if (/^\d+$/.test(span.body)) {
      let prev = span.graph.findOne('prev')

      // Unit must be preceded by unit type
      if (!prev || !prev.classifications.hasOwnProperty('UnitTypeClassification')) {
        return
      }

      span.classify(new UnitClassification(1))
    }
  }
}

module.exports = UnitClassifier
