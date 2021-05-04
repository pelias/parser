const WordClassifier = require('./super/WordClassifier')
const StreetClassification = require('../classification/StreetClassification')
const libpostal = require('../resources/libpostal/libpostal')

// dictionaries sourced from the libpostal project
// see: https://github.com/openvenues/libpostal

class CompoundStreetClassifier extends WordClassifier {
  setup () {
    // load street suffixes
    this.suffixes = {}

    libpostal.load(this.suffixes, ['de', 'nl', 'sv'], 'concatenated_suffixes_separable.txt', {
      // remove any suffixes which contain less than 3 characters (excluding a period)
      // this removes suffixes such as 'r.' which can be ambiguous
      minlength: 3
    })

    libpostal.load(this.suffixes, ['de', 'nl'], 'concatenated_suffixes_inseparable.txt', {
      // remove any suffixes which contain less than 3 characters (excluding a period)
      // this removes suffixes such as 'r.' which can be ambiguous
      minlength: 3
    })
  }

  each (span) {
    // skip spans which contain numbers
    if (span.contains.numerals) { return }

    // else use a slower suffix check which is O(n)
    // this allows us to match Germanic compound words such as:
    // 'Grolmanstraße' which end with the dictionary term '-straße'
    for (let token in this.suffixes) {
      let offet = span.body.length - token.length
      if (offet < 1) { continue }
      // perf: https://gist.github.com/dai-shi/4950506
      if (span.norm.substring(offet) === token) {
        span.classify(new StreetClassification(1.0))
        return
      }
    }
  }
}

module.exports = CompoundStreetClassifier
