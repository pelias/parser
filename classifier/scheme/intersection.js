const StreetClassification = require('../../classification/StreetClassification')
const MultiStreetClassification = require('../../classification/MultiStreetClassification')

module.exports = [
  {
    // SW 6th & Pine
    confidence: 1,
    Class: MultiStreetClassification,
    scheme: [
      {
        is: ['DirectionalClassification'],
        not: ['IntersectionClassification', 'StreetSuffixClassification']
      },
      {
        is: ['AlphaClassification', 'NumericClassification', 'OrdinalClassification'],
        not: ['IntersectionClassification', 'StreetSuffixClassification']
      },
      {
        is: ['IntersectionClassification'],
        not: ['StreetClassification', 'StreetSuffixClassification']
      },
      {
        is: ['AlphaClassification', 'NumericClassification', 'OrdinalClassification'],
        not: ['IntersectionClassification']
      }
    ]
  },
  {
    // Foo St and Bar St
    confidence: 1,
    Class: MultiStreetClassification,
    scheme: [
      {
        is: ['AlphaClassification', 'NumericClassification', 'OrdinalClassification'],
        not: ['IntersectionClassification', 'StreetSuffixClassification'],
        confidence: 0.81,
        Class: StreetClassification
      },
      {
        is: ['IntersectionClassification'],
        not: ['StreetClassification', 'StreetSuffixClassification']
      },
      {
        is: ['AlphaClassification', 'NumericClassification', 'OrdinalClassification'],
        not: ['IntersectionClassification'],
        confidence: 0.82,
        Class: StreetClassification
      }
    ]
  },
  {
    // Foo and Bar St
    confidence: 1,
    Class: MultiStreetClassification,
    scheme: [
      {
        is: ['AlphaClassification'],
        not: ['IntersectionClassification', 'StreetClassification', 'StreetSuffixClassification'],
        confidence: 0.53,
        Class: StreetClassification
      },
      {
        is: ['IntersectionClassification'],
        not: ['StreetClassification', 'StreetSuffixClassification']
      },
      {
        is: ['AlphaClassification', 'NumericClassification', 'OrdinalClassification'],
        not: ['IntersectionClassification']
      }
    ]
  },
  {
    // Foo St and Bar
    confidence: 1,
    Class: MultiStreetClassification,
    scheme: [
      {
        is: ['AlphaClassification', 'NumericClassification', 'OrdinalClassification'],
        not: ['IntersectionClassification']
      },
      {
        is: ['IntersectionClassification'],
        not: ['StreetClassification', 'StreetSuffixClassification']
      },
      {
        is: ['AlphaClassification', 'NumericClassification', 'OrdinalClassification'],
        not: ['IntersectionClassification', 'StreetClassification'],
        confidence: 0.56,
        Class: StreetClassification
      }
    ]
  },
  {
    // Foo and Bar
    confidence: 1,
    Class: MultiStreetClassification,
    scheme: [
      {
        is: ['AlphaClassification'],
        not: ['IntersectionClassification', 'StreetClassification', 'StreetSuffixClassification'],
        confidence: 0.57,
        Class: StreetClassification
      },
      {
        is: ['IntersectionClassification'],
        not: ['StreetClassification', 'StreetSuffixClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['IntersectionClassification', 'StreetClassification', 'StreetSuffixClassification'],
        confidence: 0.58,
        Class: StreetClassification
      }
    ]
  }
]
