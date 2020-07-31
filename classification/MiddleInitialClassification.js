const Classification = require('../classification/Classification')

class MiddleInitialClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'middle_initial'
  }
}

module.exports = MiddleInitialClassification
