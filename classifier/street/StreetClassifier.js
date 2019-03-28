const fs = require('fs')
const path = require('path')
const Classifier = require('../../classification/Classifier')
const Classification = require('../../classification/Classification')

// postcode data sourced from google-i18n project
// see: https://chromium-i18n.appspot.com/ssl-address

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
        row.split('|').forEach(cell => {
          this.index[cell] = true
        })
      }, this)
    }, this)
  }

  each(span) {
    if( this.index.hasOwnProperty(span.body.toLowerCase()) ) {
      this.results.push( new Classification(span, 'STREET', 1) )
    }
  }
}

module.exports = StreetClassifier