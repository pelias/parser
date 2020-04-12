const Classification = require('./Classification')

class UnitClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.public = true
    this.label = 'unit'
  }
}

module.exports = UnitClassification
