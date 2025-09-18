const Classification = require('./Classification')

class SingleAlphaClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'single_alpha'
  }
}

module.exports = SingleAlphaClassification
