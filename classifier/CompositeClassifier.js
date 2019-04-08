const PermutationClassifier = require('./super/PermutationClassifier')
const StreetClassification = require('../classification/StreetClassification')

const streetSchemes = [
  {
    // West Main Street
    confidence: 1.0,
    Class: StreetClassification,
    is: [
      'DirectionalClassification',
      'AlphaClassification',
      'StreetSuffixClassification'
    ],
    not: [
      'StreetClassification'
    ]
  },
  {
    // Main Street
    confidence: 1.0,
    Class: StreetClassification,
    is: [
      'AlphaClassification',
      'StreetSuffixClassification'
    ],
    not: [
      'StreetClassification'
    ]
  },
  {
    // West 26th Street
    confidence: 1.0,
    Class: StreetClassification,
    is: [
      'DirectionalClassification',
      'OrdinalClassification',
      'StreetSuffixClassification'
    ],
    not: [
      'StreetClassification'
    ]
  },
  {
    // 26th Street
    confidence: 1.0,
    Class: StreetClassification,
    is: [
      'OrdinalClassification',
      'StreetSuffixClassification'
    ],
    not: [
      'StreetClassification'
    ]
  },
  {
    // West 26 Street
    confidence: 0.2,
    Class: StreetClassification,
    is: [
      'DirectionalClassification',
      'NumericClassification',
      'StreetSuffixClassification'
    ],
    not: [
      'StreetClassification'
    ]
  },
  {
    // 26 Street
    confidence: 0.2,
    Class: StreetClassification,
    is: [
      'NumericClassification',
      'StreetSuffixClassification'
    ],
    not: [
      'StreetClassification'
    ]
  }
]

class CompositeClassifier extends PermutationClassifier {
  each (span) {
    streetSchemes.forEach(s => {
      if (span.child.length === s.is.length) {
        if (
          s.is.every((c, i) => span.child[i].classifications.hasOwnProperty(c)) &&
          s.not.every((c, i) => !span.child[i].classifications.hasOwnProperty(c))
        ) {
          span.classify(new s.Class(s.confidence))
        }
      }
    })
  }
}

module.exports = CompositeClassifier
