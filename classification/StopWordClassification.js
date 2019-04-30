const Classification = require('./Classification')

class StopWordClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'stop_word'
  }
}

module.exports = StopWordClassification
