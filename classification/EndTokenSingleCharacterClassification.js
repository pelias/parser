const Classification = require('./Classification')

class EndTokenSingleCharacterClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'end_token_single_character'
  }
}

module.exports = EndTokenSingleCharacterClassification
