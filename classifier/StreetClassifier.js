const WordClassifier = require('./super/WordClassifier')
const StreetClassification = require('../classification/StreetClassification')
const StreetSuffixClassification = require('../classification/StreetSuffixClassification')
const libpostal = require('../resources/libpostal/libpostal')

// dictionaries sourced from the libpostal project
// see: https://github.com/openvenues/libpostal

class StreetClassifier extends WordClassifier {
  setup () {
    // load street tokens
    this.streetTypes = {}
    libpostal.load(this.streetTypes, libpostal.languages, 'street_types.txt')

    // load street suffixes
    this.suffixes = {}
    libpostal.load(this.suffixes, libpostal.languages, 'concatenated_suffixes_separable.txt')
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
        return
      }
    }

    // else use a slower suffix check which is O(n)
    // this allows us to match Germanic compound words such as:
    // 'Grolmanstraße' which end with the dictionary term '-straße'
    if (!span.contains.final.period) {
      for (let token in this.suffixes) {
        let offet = span.body.length - token.length
        if (offet < 1) { continue }
        // perf: https://gist.github.com/dai-shi/4950506
        if (span.norm.substring(offet) === token) {
          span.classify(new StreetClassification(confidence))
          return
        }
      }
    }
  }
}

module.exports = StreetClassifier
