const WordClassifier = require('./super/WordClassifier')
const AlphaClassification = require('../classification/AlphaClassification')
const NumericClassification = require('../classification/NumericClassification')
const AlphaNumericClassification = require('../classification/AlphaNumericClassification')

class AlphaNumericClassifier extends WordClassifier {
  each (span) {
    if (!span.contains.numerals) {
      span.classify(new AlphaClassification(1))
    } else if (/^\d+$/.test(span.norm)) {
      span.classify(new NumericClassification(1))
    } else {
      span.classify(new AlphaNumericClassification(1))
    }
  }
}

module.exports = AlphaNumericClassifier
