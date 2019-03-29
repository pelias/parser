const fs = require('fs')
const path = require('path')
const WordClassifier = require('../../classification/WordClassifier')
const Classification = require('../../classification/Classification')

// dictionaries sourced from the libpostal project
// see: https://github.com/openvenues/libpostal

const whitelist = [
  { lang: 'en' },
  { lang: 'de' },
  { lang: 'fr' }
]
class StreetClassifier extends WordClassifier {
  constructor() {
    super()
    this.loadStreetTypes()
  }

  loadStreetTypes() {
    this.streetTypes = {}
    this.suffixes = {}
    
    whitelist.forEach(item => {
      let filepath = path.join( __dirname, `../../resources/libpostal/dictionaries/${item.lang}/street_types.txt` )
      if( !fs.existsSync( filepath ) ){ return }
      let dict = fs.readFileSync(filepath, 'utf8')
      dict.split('\n').forEach(row => {
        row.split('|').forEach(cell => {
          this.streetTypes[cell.trim()] = true
        })
      }, this)
    }, this)

    whitelist.forEach(item => {
      let filepath = path.join(__dirname, `../../resources/libpostal/dictionaries/${item.lang}/concatenated_suffixes_separable.txt`)
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
    // normalize string body
    let body = span.body.toLowerCase()
    let confidence = 1

    // use an inverted index for full token matching as it's O(1)
    if( this.streetTypes.hasOwnProperty( body ) ) {
      if( body.length < 2 ){ confidence = 0.2 } // single letter streets are uncommon
      this.add( new Classification( span, 'STREET:SUFFIX', confidence ) )
    }

    // try again for abbreviations denoted by a period such as 'str.'
    else if( body.slice(-1) === '.' && this.streetTypes.hasOwnProperty( body.slice( 0, -1 ) )){
      if( body.length < 3 ){ confidence = 0.2 } // single letter streets are uncommon
      this.add( new Classification( span, 'STREET:SUFFIX', confidence) )
    }

    // else use a slower suffix check which is O(n)
    // this allows us to match Germanic compound words such as:
    // 'Grolmanstraße' which end with the dictionary term '-straße'
    else {
      for( let token in this.suffixes ){
        if( span.body.length <= token.length ){ continue }
        if( body.slice( -token.length ) === token ){
          this.add( new Classification( span, 'STREET', confidence ) )
          break
        }
      }
    }
  }
}

module.exports = StreetClassifier