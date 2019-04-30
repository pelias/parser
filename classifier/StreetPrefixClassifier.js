const WordClassifier = require('./super/WordClassifier')
const StreetPrefixClassification = require('../classification/StreetPrefixClassification')
const libpostal = require('../resources/libpostal/libpostal')

// dictionaries sourced from the libpostal project
// see: https://github.com/openvenues/libpostal

class StreetPrefixClassifier extends WordClassifier {
  setup () {
    // load street tokens
    this.streetTypes = {}
    libpostal.load(this.streetTypes, ['fr'], 'street_types.txt')
  }

  each (span) {
    // skip spans which contain numbers
    if (span.contains.numerals) { return }

    // base confidence
    let confidence = 1

    // use an inverted index for full token matching as it's O(1)
    if (this.streetTypes.hasOwnProperty(span.norm)) {
      if (span.norm.length < 2) { confidence = 0.2 } // single letter streets are uncommon
      span.classify(new StreetPrefixClassification(confidence))
      return
    }

    // try again for abbreviations denoted by a period such as 'str.', also O(1)
    if (span.contains.final.period && this.streetTypes.hasOwnProperty(span.norm.slice(0, -1))) {
      if (span.norm.length < 3) { confidence = 0.2 } // single letter streets are uncommon
      span.classify(new StreetPrefixClassification(confidence))
    }
  }
}

module.exports = StreetPrefixClassifier
