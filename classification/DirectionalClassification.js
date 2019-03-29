const Classification = require('../classification/Classification')

class DirectionalClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'directional'
  }
}

module.exports = DirectionalClassification
