const Classification = require('./Classification')

class AreaClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'area'
  }
}

module.exports = AreaClassification
