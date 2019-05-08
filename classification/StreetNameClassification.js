const Classification = require('./Classification')

class StreetNameClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'street_name'
  }
}

module.exports = StreetNameClassification
