const fs = require('fs')
const path = require('path')
const WordClassifier = require('../../classification/WordClassifier')
const Classification = require('../../classification/Classification')
const dictPath = path.join(__dirname, `../../resources/libpostal/dictionaries`)

// dictionaries sourced from the libpostal project
// see: https://github.com/openvenues/libpostal

// include all languages
const allLanguages = fs.readdirSync( dictPath ).filter( p => !p.includes('.') )

// optionally control which languages are included
// note: reducing the languages will have a considerable performance benefit
const streetTypeWhitelist = allLanguages
const suffixWhitelist = [ 'de' ]

class StreetClassifier extends WordClassifier {
  constructor() {
    super()
    this.loadStreetTypes()
    this.loadSuffixes()
  }

  loadStreetTypes() {
    this.streetTypes = {}
    streetTypeWhitelist.forEach(lang => {
      let filepath = path.join( dictPath, lang, 'street_types.txt' )
      if( !fs.existsSync( filepath ) ){ return }
      let dict = fs.readFileSync(filepath, 'utf8')
      dict.split('\n').forEach(row => {
        row.split('|').forEach(cell => {
          this.streetTypes[cell.trim()] = true
        })
      }, this)
    }, this)
  }

  loadSuffixes() {
    this.suffixes = {}
    suffixWhitelist.forEach(lang => {
      let filepath = path.join( dictPath, lang, 'concatenated_suffixes_separable.txt' )
      if( !fs.existsSync( filepath ) ){ return }
      let dict = fs.readFileSync(filepath, 'utf8')
      dict.split('\n').forEach(row => {
        row.split('|').forEach(cell => {
          this.suffixes[cell.trim()] = true
        })
      }, this)
    }, this)
  }

  each(span) {
    // skip spans which contain numbers
    if( span.contains.numerals ){ return }

    // normalize string body
    let body = span.body.toLowerCase()
    let confidence = 1

    // use an inverted index for full token matching as it's O(1)
    if( this.streetTypes.hasOwnProperty( body ) ) {
      if( body.length < 2 ){ confidence = 0.2 } // single letter streets are uncommon
      this.add( new Classification( span, Classification.STREET_SUFFIX, confidence ) )
      return
    }

    // try again for abbreviations denoted by a period such as 'str.', also O(1)
    else if( span.contains.final.period && this.streetTypes.hasOwnProperty( body.slice( 0, -1 ) )){
      if( body.length < 3 ){ confidence = 0.2 } // single letter streets are uncommon
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
        if( span.body.substring( offet ) === token ){
          this.add( new Classification( span, Classification.STREET, confidence ) )
          return
        }
      }
    }
  }
}

module.exports = StreetClassifier