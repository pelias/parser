const PhraseClassifier = require('./super/PhraseClassifier')
const ChainClassification = require('../classification/ChainClassification')
const libpostal = require('../resources/libpostal/libpostal')

// dictionaries sourced from the libpostal project
// see: https://github.com/openvenues/libpostal

class ChainClassifier extends PhraseClassifier {
  setup () {
    this.index = {}
    libpostal.load(this.index, ['all'], 'chains.txt')
  }

  each (span) {
    // use an inverted index for full token matching as it's O(1)
    if (this.index.hasOwnProperty(span.norm)) {
      span.classify(new ChainClassification(1))
    }
  }
}

module.exports = ChainClassifier
