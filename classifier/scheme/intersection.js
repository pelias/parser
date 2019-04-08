const StreetClassification = require('../../classification/StreetClassification')
const MultiStreetClassification = require('../../classification/MultiStreetClassification')

module.exports = [
  {
    // Foo and Bar
    confidence: 1,
    Class: MultiStreetClassification,
    scheme: [
      {
        is: ['AlphaClassification'],
        not: ['IntersectionClassification', 'StreetClassification', 'StreetSuffixClassification'],
        confidence: 0.5,
        Class: StreetClassification
      },
      {
        is: ['IntersectionClassification'],
        not: ['StreetClassification', 'StreetSuffixClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['IntersectionClassification', 'StreetClassification', 'StreetSuffixClassification'],
        confidence: 0.5,
        Class: StreetClassification
      }
    ]
  }
]
