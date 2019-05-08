const StreetNameClassification = require('../../classification/StreetNameClassification')

module.exports = [
  {
    // dos Fiéis
    confidence: 0.5,
    Class: StreetNameClassification,
    scheme: [
      {
        is: ['StopWordClassification']
      },
      {
        is: ['AlphaClassification', 'PersonClassification'],
        not: ['StreetClassification', 'IntersectionClassification']
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
        not: ['StreetClassification', 'IntersectionClassification', 'StopWordClassification']
      },
      {
        is: ['StopWordClassification']
      },
      {
        is: ['AlphaClassification', 'PersonClassification'],
        not: ['StreetClassification', 'IntersectionClassification']
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
