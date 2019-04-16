const Classification = require('../classification/Classification')

class ChainClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'chain'
  }
}

module.exports = ChainClassification
