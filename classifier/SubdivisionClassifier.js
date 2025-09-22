const PhraseClassifier = require('./super/PhraseClassifier')
const SubdivisionClassification = require('../classification/SubdivisionClassification')
const libpostal = require('../resources/libpostal/libpostal')

class SubdivisionClassifier extends PhraseClassifier {
  setup () {
    this.index = {}
    libpostal.load(this.index, ['fr'], 'subdivisions.txt', {
      lowercase: true,
      minlength: 3 // prevent very short names being indexed
    })
  }

  each (span) {
    // skip spans which contain numbers
    if (span.contains.numerals) { return }

    // use an inverted index for full token matching as it's O(1)
    if (this.index.hasOwnProperty(span.norm)) {
      span.classify(new SubdivisionClassification(1))
    }
  }
}

module.exports = SubdivisionClassifier
