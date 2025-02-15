const WordClassifier = require('./super/WordClassifier')
const PostcodeClassification = require('../classification/PostcodeClassification')
const zipregex = require('../resources/chromium-i18n/zipregex')

// postcode data sourced from google-i18n project
// see: https://chromium-i18n.appspot.com/ssl-address
// note: reducing the list of country codes will have a performance benefit
// const countryCodes = fs.readdirSync(dictPath)
//   .filter(p => p.endsWith('.json'))
//   .map(p => p.split('.')[0])
const countryCodes = ['us', 'gb', 'fr', 'de', 'es', 'pt', 'au', 'nz', 'kr', 'jp', 'in', 'ru', 'br', 'nl', 'pl']

class PostcodeClassifier extends WordClassifier {
  setup () {
    this.data = countryCodes.map(cc => {
      let regex = zipregex[cc.toUpperCase()]
      return new RegExp('^(' + regex + ')$', 'i')
    }).filter(regex => !regex.test('100')) // remove countries with 3-digit postcodes
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
      if (this.data[i].test(span.norm)) {
        span.classify(new PostcodeClassification(1))
        break
      }
    }
  }
}

module.exports = PostcodeClassifier
