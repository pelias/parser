const Classification = require('./Classification')

class PostcodeClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'POSTCODE'
  }
}

module.exports = PostcodeClassification
