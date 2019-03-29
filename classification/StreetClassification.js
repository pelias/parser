const Classification = require('./Classification')

class StreetClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'street'
  }
}

module.exports = StreetClassification
