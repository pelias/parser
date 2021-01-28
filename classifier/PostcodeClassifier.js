// const fs = require('fs')
const path = require('path')
const WordClassifier = require('./super/WordClassifier')
const PostcodeClassification = require('../classification/PostcodeClassification')
const dictPath = path.join(__dirname, `../resources/chromium-i18n/ssl-address`)

// postcode data sourced from google-i18n project
// see: https://chromium-i18n.appspot.com/ssl-address
// note: reducing the list of country codes will have a performance benefit
// const countryCodes = fs.readdirSync(dictPath)
//   .filter(p => p.endsWith('.json'))
//   .map(p => p.split('.')[0])
const countryCodes = ['us', 'gb', 'fr', 'de', 'es', 'pt', 'au', 'nz', 'kr', 'jp', 'in', 'ru', 'br', 'nl']

class PostcodeClassifier extends WordClassifier {
  setup () {
    this.data = countryCodes.map(cc => {
      let row = require(path.join(dictPath, `${cc.toUpperCase()}.json`))
      row.regex = new RegExp('^(' + row.zip + ')$', 'i')
      return row
    }).filter(row => !row.regex.test('100')) // remove countries with 3-digit postcodes
  }

  each (span) {
    // skip spans which do not contain numbers
    // @todo: is this correct globally?
    if (!span.contains.numerals) { return }

    // do not allow postcode in the start position unless it is the
    // only token present in its section
    if (
      span.classifications.hasOwnProperty('StartTokenClassification') &&
      (span.graph.length('prev') > 0 || span.graph.length('next') > 0)
    ) {
      return
    }

    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].regex.test(span.norm)) {
        span.classify(new PostcodeClassification(1))
        break
      }
    }
  }
}

module.exports = PostcodeClassifier
