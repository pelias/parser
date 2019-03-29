const Classification = require('./Classification')

class StreetSuffixClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'STREET:SUFFIX'
  }
}

module.exports = StreetSuffixClassification
