const WordClassifier = require('./super/WordClassifier')
const UnitTypeClassification = require('../classification/UnitTypeClassification')
const libpostal = require('../resources/libpostal/libpostal')

class UnitTypeClassifier extends WordClassifier {
  setup () {
    // load index tokens
    this.index = {}
    libpostal.load(this.index, ['en'], 'unit_types_numbered.txt')
  }
  each (span) {
    // skip spans which contain numbers
    if (span.contains.numerals) { return }

    // use an inverted index for full token matching as it's O(1)
    if (this.index.hasOwnProperty(span.norm)) {
      span.classify(new UnitTypeClassification(1.0))
    }
  }
}

module.exports = UnitTypeClassifier
