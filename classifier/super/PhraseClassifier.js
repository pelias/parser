const BaseClassifier = require('./BaseClassifier')

class PhraseClassifier extends BaseClassifier {
  // classify an individual permutation

  // note: you should provide this function in your subclass
  // each(span) {}

  // run classifier against every permutation produced by the tokenizer
  classify (tokenizer) {
    for (let i = 0; i < tokenizer.section.length; i++) {
      let phrases = tokenizer.section[i].graph.findAll('phrase')
      for (let j = 0; j < phrases.length; j++) {
        this.each(phrases[j], i, j)
      }
    }
  }
}

module.exports = PhraseClassifier
