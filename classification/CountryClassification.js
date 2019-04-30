const Classification = require('./Classification')

class CountryClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.public = true
    this.label = 'country'
  }
}

module.exports = CountryClassification
