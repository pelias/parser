const WordClassifier = require('./super/WordClassifier')
const StreetSuffixClassification = require('../classification/StreetSuffixClassification')
const libpostal = require('../resources/libpostal/libpostal')

// dictionaries sourced from the libpostal project
// see: https://github.com/openvenues/libpostal

class StreetSuffixClassifier extends WordClassifier {
  setup () {
    // load street tokens
    this.streetTypes = {}
    // Exclude french types because they are street prefix
    libpostal.load(this.streetTypes, libpostal.languages.filter(e => e !== 'fr'), 'street_types.txt')

    // blacklist
    // this Italian contracted form of Androna causes issues in English
    delete this.streetTypes.and
  }

  each (span, _, pos) {
    // skip spans which contain numbers
    if (span.contains.numerals) { return }

    // base confidence
    let confidence = 1

    // skip checking spans in the first position within their section
    // note: assuming that a street suffix should not appear as the first token
    if (pos > 0) {
      // use an inverted index for full token matching as it's O(1)
      if (this.streetTypes.hasOwnProperty(span.norm)) {
        if (span.norm.length < 2) { confidence = 0.2 } // single letter streets are uncommon
        span.classify(new StreetSuffixClassification(confidence))
        return
      }

      // try again for abbreviations denoted by a period such as 'str.', also O(1)
      if (span.contains.final.period && this.streetTypes.hasOwnProperty(span.norm.slice(0, -1))) {
        if (span.norm.length < 3) { confidence = 0.2 } // single letter streets are uncommon
        span.classify(new StreetSuffixClassification(confidence))
      }
    }
  }
}

module.exports = StreetSuffixClassifier
