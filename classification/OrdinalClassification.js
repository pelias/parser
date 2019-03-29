const Classification = require('./Classification')

class OrdinalClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'ORDINAL'
  }
}

module.exports = OrdinalClassification
