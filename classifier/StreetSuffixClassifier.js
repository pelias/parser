const WordClassifier = require('./super/WordClassifier')
const StreetSuffixClassification = require('../classification/StreetSuffixClassification')
const libpostal = require('../resources/libpostal/libpostal')

// dictionaries sourced from the libpostal project
// see: https://github.com/openvenues/libpostal

// prefix languages
// languages which use a street prefix instead of a suffix
const prefix = ['fr', 'ca', 'es', 'pt', 'ro']

class StreetSuffixClassifier extends WordClassifier {
  setup () {
    // load street tokens
    this.index = {}
    // Exclude french types because they are street prefix
    libpostal.load(this.index, libpostal.languages.filter(e => !prefix.includes(e)), 'street_types.txt')

    // blacklist any token under 2 chars in length
    for (let token in this.index) {
      if (token.length < 2) {
        delete this.index[token]
      }
    }
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
      if (this.index.hasOwnProperty(span.norm)) {
        if (span.norm.length < 2) { confidence = 0.2 } // single letter streets are uncommon
        span.classify(new StreetSuffixClassification(confidence))
        return
      }

      // try again for abbreviations denoted by a period such as 'str.', also O(1)
      if (span.contains.final.period && this.index.hasOwnProperty(span.norm.slice(0, -1))) {
        if (span.norm.length < 3) { confidence = 0.2 } // single letter streets are uncommon
        span.classify(new StreetSuffixClassification(confidence))
      }
    }
  }
}

module.exports = StreetSuffixClassifier
