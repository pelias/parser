const Classification = require('../classification/Classification')

class PersonalSuffixClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'personal_suffix'
  }
}

module.exports = PersonalSuffixClassification
