const StreetNameClassification = require('../../classification/StreetNameClassification')

module.exports = [
  {
    // dos Fiéis, a Santa
    confidence: 0.5,
    Class: StreetNameClassification,
    scheme: [
      {
        is: ['StopWordClassification', 'SingleAlphaClassification'],
        not: ['DirectionalClassification', 'IntersectionClassification']
      },
      {
        is: ['AlphaClassification', 'PersonClassification'],
        not: ['StreetClassification', 'IntersectionClassification', 'StreetSuffixClassification']
      }
    ]
  },
  {
    // Academia das Ciências, Sol a Santa
    confidence: 0.5,
    Class: StreetNameClassification,
    scheme: [
      {
        is: ['AlphaClassification'],
        not: ['StreetClassification', 'IntersectionClassification', 'StopWordClassification', 'SingleAlphaClassification', 'StreetPrefixClassification']
      },
      {
        is: ['StopWordClassification', 'SingleAlphaClassification'],
        not: ['DirectionalClassification']
      },
      {
        is: ['AlphaClassification', 'PersonClassification'],
        not: ['StreetClassification', 'IntersectionClassification', 'StreetSuffixClassification']
      }
    ]
  },
  {
    // du 4 septembre
    confidence: 0.5,
    Class: StreetNameClassification,
    scheme: [
      {
        is: ['StopWordClassification'],
        not: ['IntersectionClassification']
      },
      {
        is: ['NumericClassification'],
        not: ['PostcodeClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['StreetClassification', 'IntersectionClassification', 'LocalityClassification']
      }
    ]
  },
  {
    // dos Fiéis de Deus
    confidence: 0.5,
    Class: StreetNameClassification,
    scheme: [
      {
        is: ['StreetNameClassification'],
        not: ['StreetClassification', 'IntersectionClassification']
      },
      {
        is: ['StreetNameClassification'],
        not: ['StreetClassification', 'IntersectionClassification']
      }
    ]
  }
]
