const fs = require('fs')
const path = require('path')
const WordClassifier = require('../../classification/WordClassifier')
const Classification = require('../../classification/Classification')
const dictPath = path.join(__dirname, `../../resources/libpostal/dictionaries`)

// dictionaries sourced from the libpostal project
// see: https://github.com/openvenues/libpostal

// const languages = fs.readdirSync( dictPath ).filter( p => !p.includes('.') )

// optionally control which languages are included
// note: reducing the languages will have a considerable performance benefit
const languages = ['en', 'es', 'de', 'fr']

class DirectionalClassifier extends WordClassifier {
  constructor() {
    super()
    this.loadDirectionals()
  }

  loadDirectionals() {
    this.index = {} // inverted index

    languages.forEach(lang => {
      let filepath = path.join( dictPath, lang, 'directionals.txt' )
      if( !fs.existsSync( filepath ) ){ return }
      let dict = fs.readFileSync( filepath, 'utf8' )
      dict.split('\n').forEach(row => {
        row.split('|').forEach(cell => {
          this.index[cell.trim()] = true
        })
      }, this)
    }, this)
  }

  each(span) {
    // skip spans which contain numbers
    if( span.contains.numerals ){ return }

    // use an inverted index for full token matching as it's O(1)
    if( this.index.hasOwnProperty(span.norm) ){
      this.add( new Classification(span, Classification.DIRECTIONAL, 1) )
    }
    
    // try again for abbreviations denoted by a period such as 'n.'
    else if( span.norm.slice(-1) === '.' && this.index.hasOwnProperty( span.norm.slice( 0, -1 ) )){
      this.add( new Classification(span, Classification.DIRECTIONAL, 1) )
    }
  }
}

module.exports = DirectionalClassifier