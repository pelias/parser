const PersonClassification = require('../../classification/PersonClassification')
const GivenNameClassification = require('../../classification/GivenNameClassification')

module.exports = [
  {
    // Anne Marie
    confidence: 0.25,
    Class: GivenNameClassification,
    scheme: [
      {
        is: ['GivenNameClassification'],
        not: ['PunctuationClassification', 'StreetClassification', 'IntersectionClassification']
      },
      {
        is: ['GivenNameClassification'],
        not: ['PunctuationClassification', 'StreetClassification', 'StreetPrefixClassification', 'StopWordClassification']
      }
    ]
  },
  {
    // Georges Bizet
    confidence: 0.5,
    Class: PersonClassification,
    scheme: [
      {
        is: ['GivenNameClassification'],
        not: ['PunctuationClassification', 'StreetClassification', 'IntersectionClassification']
      },
      {
        is: ['SurnameClassification'],
        not: ['PunctuationClassification', 'StreetClassification', 'StreetPrefixClassification', 'StopWordClassification']
      }
    ]
  },
  {
    // Rose de Lima
    confidence: 0.5,
    Class: PersonClassification,
    scheme: [
      {
        is: ['GivenNameClassification'],
        not: ['PunctuationClassification', 'StreetClassification', 'IntersectionClassification']
      },
      {
        is: ['StopWordClassification'],
        not: ['PunctuationClassification', 'StreetClassification', 'IntersectionClassification']
      },
      {
        is: ['SurnameClassification'],
        not: ['PunctuationClassification', 'StreetClassification', 'StreetPrefixClassification', 'StopWordClassification']
      }
    ]
  },
  {
    // Raul Leite Magalhães (first name, middle name, family name)
    confidence: 0.5,
    Class: PersonClassification,
    scheme: [
      {
        is: ['GivenNameClassification'],
        not: ['PunctuationClassification', 'StreetClassification', 'IntersectionClassification']
      },
      {
        is: ['GivenNameClassification', 'SurnameClassification'],
        not: ['PunctuationClassification', 'StreetClassification', 'IntersectionClassification']
      },
      {
        is: ['SurnameClassification'],
        not: ['PunctuationClassification', 'StreetClassification', 'StreetPrefixClassification', 'StopWordClassification']
      }
    ]
  },
  {
    // Unknown surname
    confidence: 0.1,
    Class: PersonClassification,
    scheme: [
      {
        is: ['GivenNameClassification'],
        not: ['PunctuationClassification', 'StreetClassification', 'IntersectionClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PunctuationClassification', 'StreetClassification', 'StreetPrefixClassification', 'StopWordClassification']
      }
    ]
  },
  {
    // Unknown surname
    confidence: 0.1,
    Class: PersonClassification,
    scheme: [
      {
        is: ['GivenNameClassification'],
        not: ['PunctuationClassification', 'StreetClassification', 'IntersectionClassification']
      },
      {
        is: ['StopWordClassification'],
        not: ['PunctuationClassification', 'StreetClassification', 'IntersectionClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PunctuationClassification', 'StreetClassification', 'StreetPrefixClassification', 'StopWordClassification']
      }
    ]
  }
]
