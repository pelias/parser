const fs = require('fs')
const path = require('path')
const Classifier = require('../../classification/Classifier')
const Classification = require('../../classification/Classification')

// dictionaries sourced from the libpostal project
// see: https://github.com/openvenues/libpostal

const whitelist = [
  { lang: 'en' },
  { lang: 'de' },
  { lang: 'fr' }
]
class DirectionalClassifier extends Classifier {
  constructor() {
    super()
    this.loadDirectionals()
  }

  loadDirectionals() {
    this.index = {} // inverted index

    whitelist.forEach(item => {
      let filepath = path.join(__dirname, `../../resources/libpostal/dictionaries/${item.lang}/directionals.txt`)
      let dict = fs.readFileSync(filepath, 'utf8')
      dict.split('\n').forEach(row => {
        row.split('|').forEach(cell => {
          this.index[cell] = true
        })
      }, this)
    }, this)
  }

  each(span) {
    // normalize string body
    let body = span.body.toLowerCase()

    // use an inverted index for full token matching as it's O(1)
    if( this.index.hasOwnProperty(body) ){
      this.results.push( new Classification(span, 'DIRECTIONAL', 1) )
    }
    
    // try again for abbreviations denoted by a period such as 'n.'
    else if( body.slice(-1) === '.' && this.index.hasOwnProperty( body.slice( 0, -1 ) )){
      this.results.push( new Classification(span, 'DIRECTIONAL', 1) )
    }
  }
}

module.exports = DirectionalClassifier