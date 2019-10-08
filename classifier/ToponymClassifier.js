const WordClassifier = require('./super/WordClassifier')
const ToponymClassification = require('../classification/ToponymClassification')
const libpostal = require('../resources/libpostal/libpostal')

// dictionaries sourced from the libpostal project
// see: https://github.com/openvenues/libpostal

class ToponymClassifier extends WordClassifier {
  setup () {
    // load street tokens
    this.index = {}
    libpostal.load(this.index, ['en'], 'toponyms.txt')
  }

  each (span) {
    // skip spans which contain numbers
    if (span.contains.numerals) { return }

    // use an inverted index for full token matching as it's O(1)
    if (this.index.hasOwnProperty(span.norm)) {
      span.classify(new ToponymClassification(1, this.index[span.norm]))
    }
  }
}

module.exports = ToponymClassifier
