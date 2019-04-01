const Classification = require('../classification/Classification')

class IntersectionClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'intersection'
  }
}

module.exports = IntersectionClassification
