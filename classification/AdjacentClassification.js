const Classification = require('../classification/Classification')

class AdjacentClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'adjacent'
  }
}

module.exports = AdjacentClassification
