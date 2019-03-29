const PermutationClassifier = require('./super/PermutationClassifier')
const StreetClassification = require('../classification/StreetClassification')

const streetSchemes = [
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
      'HouseNumberClassification',
      'StreetSuffixClassification'
    ]
  },
  {
    // 26 Street
    confidence: 0.2,
    classifications: [
      'HouseNumberClassification',
      'StreetSuffixClassification'
    ]
  }
]

class MultiWordStreetClassifier extends PermutationClassifier {
  each (span) {
    streetSchemes.forEach(s => {
      if (span.child.length === s.classifications.length) {
        if (s.classifications.every((c, i) => span.child[i].classifications.hasOwnProperty(c))) {
          span.classify(new StreetClassification(s.confidence))
        }
      }
    })
  }
}

module.exports = MultiWordStreetClassifier
