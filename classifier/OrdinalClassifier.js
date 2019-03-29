const WordClassifier = require('./super/WordClassifier')
const OrdinalClassification = require('../classification/OrdinalClassification')

class OrdinalClassifier extends WordClassifier {
  each (span) {
    // skip spans which do not contain numbers
    if (!span.contains.numerals) { return }

    // use negative lookbehind to find numbers ending with ordinal suffix
    // @todo: add non-english ordinal suffixes
    if (/(?<=[0-9])(?:st|nd|rd|th)/.test(span.norm)) {
      span.classify(new OrdinalClassification(1))
    }
  }
}

module.exports = OrdinalClassifier
