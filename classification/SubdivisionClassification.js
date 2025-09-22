const Classification = require('../classification/Classification')

class SubdivisionClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'subdivision'
  }
}

module.exports = SubdivisionClassification
