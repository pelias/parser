const WordClassifier = require('../classification/WordClassifier')
const Classification = require('../classification/Classification')
const libpostal = require('../resources/libpostal/libpostal')

// dictionaries sourced from the libpostal project
// see: https://github.com/openvenues/libpostal

// optionally control which languages are included
// note: reducing the languages will have a considerable performance benefit
const streetTypeLangs = libpostal.languages
const suffixLangs = [ 'de' ]

class StreetClassifier extends WordClassifier {
  constructor() {
    super()
    this.loadStreetTypes()
    this.loadSuffixes()
  }

  loadStreetTypes() {
    this.streetTypes = {}
    libpostal.load( this.streetTypes, streetTypeLangs, 'street_types.txt' )
  }

  loadSuffixes() {
    this.suffixes = {}
    libpostal.load( this.suffixes, suffixLangs, 'concatenated_suffixes_separable.txt' )
  }

  each(span) {
    // skip spans which contain numbers
    if( span.contains.numerals ){ return }

    // base confidence
    let confidence = 1

    // use an inverted index for full token matching as it's O(1)
    if( this.streetTypes.hasOwnProperty( span.norm ) ) {
      if( span.norm.length < 2 ){ confidence = 0.2 } // single letter streets are uncommon
      this.add( new Classification( span, Classification.STREET_SUFFIX, confidence ) )
      return
    }

    // try again for abbreviations denoted by a period such as 'str.', also O(1)
    else if( span.contains.final.period && this.streetTypes.hasOwnProperty( span.norm.slice( 0, -1 ) )){
      if( span.norm.length < 3 ){ confidence = 0.2 } // single letter streets are uncommon
      this.add( new Classification( span, Classification.STREET_SUFFIX, confidence) )
      return
    }

    // else use a slower suffix check which is O(n)
    // this allows us to match Germanic compound words such as:
    // 'Grolmanstraße' which end with the dictionary term '-straße'
    else if( !span.contains.final.period ) {
      for( let token in this.suffixes ){
        let offet = span.body.length - token.length
        if( offet < 1 ){ continue }
        // perf: https://gist.github.com/dai-shi/4950506
        if( span.norm.substring( offet ) === token ){
          this.add( new Classification( span, Classification.STREET, confidence ) )
          return
        }
      }
    }
  }
}

module.exports = StreetClassifier