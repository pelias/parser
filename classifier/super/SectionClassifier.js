const BaseClassifier = require('./BaseClassifier')

class SectionClassifier extends BaseClassifier {
  // classify an whole section

  // note: you should provide this function in your subclass
  // each(span) {}

  classify (tokenizer) {
    for (let i = 0; i < tokenizer.section.length; i++) {
      this.each(tokenizer.section[i], this.utils(tokenizer.section[i]))
    }
  }

  utils (section) {
    return {
      // find all permutations containing a child span
      findPermutationsContaining: (child) => {
        return section.permutation.filter(p => p.child.some(pc => pc === child))
      }
    }
  }
}

module.exports = SectionClassifier
