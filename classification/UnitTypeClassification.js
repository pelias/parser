const Classification = require('./Classification')

class UnitTypeClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.public = true
    this.label = 'unit_type'
  }
}

module.exports = UnitTypeClassification
