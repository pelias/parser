const WordClassifier = require('./super/WordClassifier')
const OrdinalClassification = require('../classification/OrdinalClassification')

var ord = ''
ord += '((1)st?|(2)nd?|(3)rd?|([4-9])th?)' // singles
ord += '|' // or
ord += '(0*([0-9]*)(1[0-9])th?)' // teens
ord += '|' // or
ord += '(0*([0-9]*[02-9])((1)st?|(2)nd?|(3)rd?|([04-9])th?))' // the rest

const regex = new RegExp(`^${ord}$`, 'i')

class OrdinalClassifier extends WordClassifier {
  each (span) {
    // skip spans which do not contain numbers
    if (!span.contains.numerals) { return }

    // @todo: add non-english ordinal suffixes
    if (regex.test(span.norm)) {
      span.classify(new OrdinalClassification(1))
    }
  }
}

module.exports = OrdinalClassifier
