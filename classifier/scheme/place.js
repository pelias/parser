const PlaceClassification = require('../../classification/PlaceClassification')

module.exports = [
  {
    // University Hospital
    confidence: 1.0,
    Class: PlaceClassification,
    scheme: [
      {
        is: ['PlaceClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['PlaceClassification'],
        not: ['StreetClassification']
      }
    ]
  },
  {
    // +++ Park
    confidence: 0.9,
    Class: PlaceClassification,
    scheme: [
      {
        is: ['AlphaClassification'],
        not: ['StreetClassification', 'IntersectionClassification', 'StopWordClassification']
      },
      {
        is: ['PlaceClassification'],
        not: ['StreetClassification']
      }
    ]
  },
  {
    // Mt +++ Park
    confidence: 0.8,
    Class: PlaceClassification,
    scheme: [
      {
        is: ['PlaceClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['PlaceClassification'],
        not: []
      }
    ]
  },
  {
    // Air & Space Museum
    confidence: 0.8,
    Class: PlaceClassification,
    scheme: [
      {
        is: ['AlphaClassification'],
        not: ['StreetClassification', 'IntersectionClassification', 'StopWordClassification']
      },
      {
        is: ['StopWordClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['PlaceClassification'],
        not: []
      }
    ]
  },
  {
    // National Air & Space Museum
    confidence: 0.8,
    Class: PlaceClassification,
    scheme: [
      {
        is: ['AlphaClassification'],
        not: ['StreetClassification', 'IntersectionClassification', 'StopWordClassification']
      },
      {
        is: ['PlaceClassification'],
        not: []
      }
    ]
  },
  {
    // Stop 10792
    confidence: 0.8,
    Class: PlaceClassification,
    scheme: [
      {
        is: ['PlaceClassification'],
        not: ['StreetClassification', 'IntersectionClassification', 'StopWordClassification']
      },
      {
        is: ['NumericClassification'],
        not: []
      }
    ]
  },
  {
    // University of Somewhere
    confidence: 0.8,
    Class: PlaceClassification,
    scheme: [
      {
        is: ['PlaceClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['StopWordClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['AreaClassification'],
        not: ['StreetClassification']
      }
    ]
  },
  {
    // Ecole Jules Vernes
    confidence: 0.8,
    Class: PlaceClassification,
    scheme: [
      {
        is: ['PlaceClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['PersonClassification'],
        not: ['StreetClassification']
      }
    ]
  }
]
