const Classification = require('./Classification')

class StopWordsClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'stop_words'
  }
}

module.exports = StopWordsClassification
