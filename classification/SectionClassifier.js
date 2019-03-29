const BaseClassifier = require('./BaseClassifier')

class SectionClassifier extends BaseClassifier {
  // classify an whole section

  // note: you should provide this function in your subclass
  // each(span) {}

  classify(tokenizer) {
    for (let i = 0; i < tokenizer.section.length; i++) {
      this.each(tokenizer.section[i], i)
    }
  }
}

module.exports = SectionClassifier