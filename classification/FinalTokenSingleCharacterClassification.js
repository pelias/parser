const Classification = require('../classification/Classification')

class FinalTokenSingleCharacterClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'final_token_single_character'
  }
}

module.exports = FinalTokenSingleCharacterClassification
