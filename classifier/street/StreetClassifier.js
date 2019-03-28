const fs = require('fs')
const path = require('path')
const Classifier = require('../../classification/Classifier')
const Classification = require('../../classification/Classification')

// dictionaries sourced from the libpostal project
// see: https://github.com/openvenues/libpostal

const whitelist = ['en', 'de', 'fr']

class StreetClassifier extends Classifier {
  constructor() {
    super()
    this.loadStreetTypes()
  }

  loadStreetTypes() {
    this.index = {}
    whitelist.forEach(lang => {
      let filepath = path.join( __dirname, `../../resources/libpostal/dictionaries/${lang}/street_types.txt` )
      let dict = fs.readFileSync(filepath, 'utf8')
      dict.split('\n').forEach(row => {
        row.split('|').forEach((cell, o) => {
          this.index[cell] = o
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
      for( let token in this.index ){
        if( this.index[token] > 0 ){ continue } // only consider the first cell
        if( span.body.length <= token.length ){ continue }
        if( body.slice(-token.length) === token ){
          this.results.push( new Classification( span, 'STREET', 1 ) )
          break
        }
      }
    }
  }
}

module.exports = StreetClassifier