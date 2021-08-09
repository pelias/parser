const WordClassifier = require('./super/WordClassifier')
const StreetProperNameClassification = require('../classification/StreetProperNameClassification')

/**
  Special handling of streets with no suffix

  see: https://github.com/pelias/parser/issues/140
**/

class StreetProperNameClassifier extends WordClassifier {
  setup () {
    this.index = {
      'broadway': true,
      'esplanade': true
    }
  }

  each (span) {
    // skip spans which contain numbers
    if (span.contains.numerals) { return }

    // classify tokens in the index as 'street_proper_name'
    if (this.index[span.norm] === true) {
      span.classify(new StreetProperNameClassification(0.7))
    }
  }
}

module.exports = StreetProperNameClassifier
