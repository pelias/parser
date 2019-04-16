const BaseSolver = require('./BaseSolver')
const Solution = require('../Solution')
const SolutionPair = require('../SolutionPair')

class HashMapSolver extends BaseSolver {
  // you should provide this function in your subclass
  // solve() {}

  generateHashMap (tokenizer, includePrivate) {
    let map = {}
    for (let i = 0; i < tokenizer.section.length; i++) {
      let section = tokenizer.section[i]

      // multi-word phrases
      let phrases = section.graph.findAll('phrase')
      for (let j = 0; j < phrases.length; j++) {
        let phrase = phrases[j]
        let keys = Object.keys(phrase.classifications)
        if (!keys.length) { continue }
        for (let k in phrase.classifications) {
          let classification = phrase.classifications[k]
          if (!includePrivate && !classification.public) { continue }
          if (!map.hasOwnProperty(classification.label)) {
            map[classification.label] = new Solution()
          }
          map[classification.label].pair.push(new SolutionPair(phrase, classification))
        }
      }

      // single-word spans
      let children = section.graph.findAll('child')
      for (let j = 0; j < children.length; j++) {
        let word = children[j]
        let keys = Object.keys(word.classifications)
        if (!keys.length) { continue }
        for (let k in word.classifications) {
          let classification = word.classifications[k]
          if (!includePrivate && !classification.public) { continue }
          if (!map.hasOwnProperty(classification.label)) {
            map[classification.label] = new Solution()
          }
          map[classification.label].pair.push(new SolutionPair(word, classification))
        }
      }
    }

    return map
  }
}

module.exports = HashMapSolver
