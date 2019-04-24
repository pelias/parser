const Classification = require('./Classification')

class RegionClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.public = true
    this.label = 'region'
  }
}

module.exports = RegionClassification
