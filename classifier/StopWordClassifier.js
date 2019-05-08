const WordClassifier = require('./super/WordClassifier')
const StopWordClassification = require('../classification/StopWordClassification')
const libpostal = require('../resources/libpostal/libpostal')

// dictionaries sourced from the libpostal project
// see: https://github.com/openvenues/libpostal

class StopWordsClassifier extends WordClassifier {
  setup () {
    // load stopwords tokens
    this.stopWords = {}
    libpostal.load(this.stopWords, ['fr', 'de', 'en', 'pt'], 'stopwords.txt')
  }

  each (span) {
    // skip spans which contain numbers
    if (span.contains.numerals) { return }

    // base confidence
    let confidence = 0.75

    // use an inverted index for full token matching as it's O(1)
    if (this.stopWords.hasOwnProperty(span.norm)) {
      if (span.norm.length < 2) { confidence = 0.2 }
      span.classify(new StopWordClassification(confidence))
    }
  }
}

module.exports = StopWordsClassifier
