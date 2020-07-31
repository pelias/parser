const PhraseClassifier = require('./super/PhraseClassifier')
const MiddleInitialClassification = require('../classification/MiddleInitialClassification')

const SingleLetterRegExp = /^[A-Za-z]\.?$/

class MiddleInitialClassifier extends PhraseClassifier {
  setup () {
  }

  each (span) {
    if (SingleLetterRegExp.test(span.body)) {
      span.classify(new MiddleInitialClassification(1))
    }
  }
}

module.exports = MiddleInitialClassifier
