const WordClassifier = require('./super/WordClassifier')
const AlphaClassification = require('../classification/AlphaClassification')
const NumericClassification = require('../classification/NumericClassification')
const AlphaNumericClassification = require('../classification/AlphaNumericClassification')
const PunctuationClassification = require('../classification/PunctuationClassification')
const SingleAlphaClassification = require('../classification/SingleAlphaClassification')

class AlphaNumericClassifier extends WordClassifier {
  each (span) {
    if (/^\d+$/.test(span.norm)) {
      span.classify(new NumericClassification(1))
    } else if (span.contains.numerals) {
      span.classify(new AlphaNumericClassification(1))
    } else if (/^[@&/\\#,+()$~%.!^'";:*?[\]<>{}]+$/.test(span.norm)) {
      span.classify(new PunctuationClassification(1))
    } else {
      span.classify(new AlphaClassification(1))
      if (span.norm.length === 1) {
        span.classify(new SingleAlphaClassification(1))
      }
    }
  }
}

module.exports = AlphaNumericClassifier
