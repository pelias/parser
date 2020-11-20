const StreetNameClassification = require('../../classification/StreetNameClassification')

module.exports = [
  {
    // dos Fiéis
    confidence: 0.5,
    Class: StreetNameClassification,
    scheme: [
      {
        is: ['StopWordClassification'],
        not: ['PunctuationClassification', 'DirectionalClassification', 'IntersectionClassification']
      },
      {
        is: ['AlphaClassification', 'PersonClassification'],
        not: ['PunctuationClassification', 'StreetClassification', 'IntersectionClassification', 'StreetSuffixClassification']
      }
    ]
  },
  {
    // Academia das Ciências
    confidence: 0.5,
    Class: StreetNameClassification,
    scheme: [
      {
        is: ['AlphaClassification'],
        not: ['PunctuationClassification', 'StreetClassification', 'IntersectionClassification', 'StopWordClassification', 'StreetPrefixClassification']
      },
      {
        is: ['StopWordClassification'],
        not: ['PunctuationClassification', 'DirectionalClassification']
      },
      {
        is: ['AlphaClassification', 'PersonClassification'],
        not: ['PunctuationClassification', 'StreetClassification', 'IntersectionClassification', 'StreetSuffixClassification']
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
        not: ['PunctuationClassification', 'IntersectionClassification']
      },
      {
        is: ['NumericClassification'],
        not: ['PunctuationClassification', 'PostcodeClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PunctuationClassification', 'StreetClassification', 'IntersectionClassification', 'LocalityClassification']
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
        not: ['PunctuationClassification', 'StreetClassification', 'IntersectionClassification']
      },
      {
        is: ['StreetNameClassification'],
        not: ['PunctuationClassification', 'StreetClassification', 'IntersectionClassification']
      }
    ]
  }
]
