const BaseClassifier = require('./BaseClassifier')

class WordClassifier extends BaseClassifier {
  // classify individual words

  // note: you should provide this function in your subclass
  // each(span) {}

  classify(tokenizer) {
    for (let i = 0; i < tokenizer.section.length; i++) {
      for (let j = 0; j < tokenizer.section[i].child.length; j++) {
        this.each(tokenizer.section[i].child[j], i, j)
      }
    }
  }
}

module.exports = WordClassifier