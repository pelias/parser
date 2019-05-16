const Classification = require('./Classification')

class CountryClassification extends Classification {
  constructor (confidence, meta) {
    super(0.9, meta)
    this.public = true
    this.label = 'country'
  }
}

module.exports = CountryClassification
