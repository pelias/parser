const Classification = require('./Classification')

class StreetPrefixClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'street_prefix'
  }
}

module.exports = StreetPrefixClassification
