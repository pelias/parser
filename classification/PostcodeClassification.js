const Classification = require('./Classification')

class PostcodeClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.public = true
    this.label = 'postcode'
  }
}

module.exports = PostcodeClassification
