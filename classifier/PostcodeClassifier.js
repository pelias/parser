const path = require('path')
const WordClassifier = require('../classification/WordClassifier')
const Classification = require('../classification/Classification')
const dictPath = path.join(__dirname, `../resources/chromium-i18n/ssl-address`)

// postcode data sourced from google-i18n project
// see: https://chromium-i18n.appspot.com/ssl-address
const whitelist = [ 'US', 'GB', 'AU', 'NZ', 'DE' ]

class PostcodeClassifier extends WordClassifier {
  setup () {
    this.data = whitelist.map(cc => {
      let row = require(path.join(dictPath, `${cc}.json`))
      row.regex = new RegExp('^(' + row.zip + ')$', 'i')
      return row
    })
  }

  each (span) {
    // skip spans which do not contain numbers
    // @todo: is this correct globally?
    if (!span.contains.numerals) { return }

    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].regex.test(span.norm)) {
        this.add(new Classification(span, Classification.POSTCODE, 1))
        break
      }
    }
  }
}

module.exports = PostcodeClassifier
