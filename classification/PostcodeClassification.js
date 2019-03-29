const Classification = require('./Classification')

class PostcodeClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'postcode'
  }
}

module.exports = PostcodeClassification
