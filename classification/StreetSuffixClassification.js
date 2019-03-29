const Classification = require('./Classification')

class StreetSuffixClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'street_suffix'
  }
}

module.exports = StreetSuffixClassification
