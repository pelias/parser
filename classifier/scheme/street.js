const StreetClassification = require('../../classification/StreetClassification')

module.exports = [
  {
    // West Main Street
    confidence: 1.0,
    Class: StreetClassification,
    scheme: [
      {
        is: ['DirectionalClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['StreetClassification', 'StreetSuffixClassification']
      },
      {
        is: ['StreetSuffixClassification'],
        not: ['StreetClassification']
      }
    ]
  },
  {
    // Main Street West
    confidence: 0.8,
    Class: StreetClassification,
    scheme: [
      {
        is: ['AlphaClassification'],
        not: ['StreetClassification', 'StreetSuffixClassification']
      },
      {
        is: ['StreetSuffixClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['DirectionalClassification'],
        not: ['StreetClassification']
      }
    ]
  },
  {
    // Main Street
    confidence: 1.0,
    Class: StreetClassification,
    scheme: [
      {
        is: ['AlphaClassification'],
        not: ['StreetClassification', 'StreetSuffixClassification', 'IntersectionClassification']
      },
      {
        is: ['StreetSuffixClassification'],
        not: ['StreetClassification']
      }
    ]
  },
  {
    // St Kilda Road
    confidence: 1.0,
    Class: StreetClassification,
    scheme: [
      {
        is: ['PersonalSuffixClassification'],
        not: ['StreetClassification', 'IntersectionClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['StreetClassification', 'StreetSuffixClassification', 'IntersectionClassification']
      },
      {
        is: ['StreetSuffixClassification'],
        not: ['StreetClassification']
      }
    ]
  },
  {
    // West 26th Street
    confidence: 1.0,
    Class: StreetClassification,
    scheme: [
      {
        is: ['DirectionalClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['OrdinalClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['StreetSuffixClassification'],
        not: ['StreetClassification']
      }
    ]
  },
  {
    // 26th Street
    confidence: 1.0,
    Class: StreetClassification,
    scheme: [
      {
        is: ['OrdinalClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['StreetSuffixClassification'],
        not: ['StreetClassification']
      }
    ]
  },
  {
    // 21st Avenue North
    confidence: 1.0,
    Class: StreetClassification,
    scheme: [
      {
        is: ['OrdinalClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['StreetSuffixClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['DirectionalClassification'],
        not: ['StreetClassification']
      }
    ]
  },
  {
    // West 26 Street
    confidence: 0.4,
    Class: StreetClassification,
    scheme: [
      {
        is: ['DirectionalClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['NumericClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['StreetSuffixClassification'],
        not: ['StreetClassification']
      }
    ]
  },
  {
    // 26 Street
    confidence: 0.4,
    Class: StreetClassification,
    scheme: [
      {
        is: ['NumericClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['StreetSuffixClassification'],
        not: ['StreetClassification']
      }
    ]
  },
  {
    // SW 6th
    confidence: 0.4,
    Class: StreetClassification,
    scheme: [
      {
        is: ['DirectionalClassification'],
        not: ['StreetClassification', 'StreetSuffixClassification']
      },
      {
        is: ['OrdinalClassification'],
        not: ['StreetClassification', 'StreetSuffixClassification']
      }
    ]
  },
  {
    // Martin Luther King Blvd.
    confidence: 1.0,
    Class: StreetClassification,
    scheme: [
      {
        is: ['PersonClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['StreetSuffixClassification'],
        not: ['StreetClassification']
      }
    ]
  },
  {
    // Martin Luther King Jr. Blvd.
    confidence: 1.0,
    Class: StreetClassification,
    scheme: [
      {
        is: ['PersonClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['PersonalSuffixClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['StreetSuffixClassification'],
        not: ['StreetClassification']
      }
    ]
  },
  {
    // Rue Montmartre
    confidence: 1.0,
    Class: StreetClassification,
    scheme: [
      {
        is: ['StreetPrefixClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['StopWordClassification', 'StreetPrefixClassification', 'StreetClassification']
      }
    ]
  },
  {
    // Rue Du Paris
    confidence: 1.0,
    Class: StreetClassification,
    scheme: [
      {
        is: ['StreetPrefixClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['StopWordClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['StreetClassification', 'StreetPrefixClassification']
      }
    ]
  },
  {
    // Boulevard De La Paix
    confidence: 1.0,
    Class: StreetClassification,
    scheme: [
      {
        is: ['StreetPrefixClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['StopWordClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['StopWordClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['StreetClassification', 'StreetPrefixClassification']
      }
    ]
  },
  {
    // Am Falkplatz
    confidence: 1.0,
    Class: StreetClassification,
    scheme: [
      {
        is: ['StopWordClassification'],
        not: ['IntersectionClassification']
      },
      {
        is: ['StreetClassification'],
        not: ['StopWordClassification']
      }
    ]
  }
]
