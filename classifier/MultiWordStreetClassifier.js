const PermutationClassifier = require('./super/PermutationClassifier')
const StreetClassification = require('../classification/StreetClassification')

const streetSchemes = [
  {
    // West Main Street
    confidence: 1.0,
    classifications: [
      'DirectionalClassification',
      'AlphaClassification',
      'StreetSuffixClassification'
    ]
  },
  {
    // Main Street
    confidence: 1.0,
    classifications: [
      'AlphaClassification',
      'StreetSuffixClassification'
    ]
  },
  {
    // West 26th Street
    confidence: 1.0,
    classifications: [
      'DirectionalClassification',
      'OrdinalClassification',
      'StreetSuffixClassification'
    ]
  },
  {
    // 26th Street
    confidence: 1.0,
    classifications: [
      'OrdinalClassification',
      'StreetSuffixClassification'
    ]
  },
  {
    // West 26 Street
    confidence: 0.2,
    classifications: [
      'DirectionalClassification',
      'NumericClassification',
      'StreetSuffixClassification'
    ]
  },
  {
    // 26 Street
    confidence: 0.2,
    classifications: [
      'NumericClassification',
      'StreetSuffixClassification'
    ]
  }
]

class MultiWordStreetClassifier extends PermutationClassifier {
  each (span) {
    streetSchemes.forEach(s => {
      if (span.child.length === s.classifications.length) {
        if (s.classifications.every((c, i) => {
          return span.child[i].classifications.hasOwnProperty(c) &&
            !span.child[i].classifications.hasOwnProperty('StreetClassification')
        })) {
          span.classify(new StreetClassification(s.confidence))
        }
      }
    })
  }
}

module.exports = MultiWordStreetClassifier
