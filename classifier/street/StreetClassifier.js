const fs = require('fs')
const path = require('path')
const Classifier = require('../../classification/Classifier')
const Classification = require('../../classification/Classification')

// dictionaries sourced from the libpostal project
// see: https://github.com/openvenues/libpostal

const whitelist = [
  { lang: 'en' },
  { lang: 'de', compound: true },
  { lang: 'fr' }
]
class StreetClassifier extends Classifier {
  constructor() {
    super()
    this.loadStreetTypes()
  }

  loadStreetTypes() {
    this.index = {} // inverted index
    this.suffixes = {} // suffix index
    
    whitelist.forEach(item => {
      let filepath = path.join( __dirname, `../../resources/libpostal/dictionaries/${item.lang}/street_types.txt` )
      let dict = fs.readFileSync(filepath, 'utf8')
      dict.split('\n').forEach(row => {
        row.split('|').forEach((cell, o) => {
          this.index[cell] = true

          // only consider suffixes from the first cell
          // of languages which use compound words
          if( item.compound && o == 0 ) {
            this.suffixes[cell] = true
          }
        })
      }, this)
    }, this)
  }

  each(span) {
    // normalize string body
    let body = span.body.toLowerCase()

    // use an inverted index for full token matching as it's O(1)
    if( this.index.hasOwnProperty( body ) ) {
      this.results.push( new Classification( span, 'STREET:SUFFIX', 1 ) )
    }

    // else use a slower suffix check which is O(n)
    // this allows us to match Germanic compound words such as:
    // 'Grolmanstraße' which end with the dictionary term '-straße'
    else {
      for( let token in this.suffixes ){
        if( span.body.length <= token.length ){ continue }
        if( span.body.indexOf(' ') >= 0 ){ continue } // multi-word
        if( body.slice(-token.length) === token ){
          this.results.push( new Classification( span, 'STREET', 1 ) )
          break
        }
      }
    }
  }
}

module.exports = StreetClassifier