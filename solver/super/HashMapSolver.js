const BaseSolver = require('./BaseSolver')
const Solution = require('../Solution')

class HashMapSolver extends BaseSolver {
  // you should provide this function in your subclass
  // solve() {}

  generateHashMap (tokenizer) {
    let map = {}
    for (let i = 0; i < tokenizer.section.length; i++) {
      let section = tokenizer.section[i]

      // multi-word permutations
      for (let j = 0; j < section.permutation.length; j++) {
        let perm = section.permutation[j]
        let keys = Object.keys(perm.classifications)
        if (!keys.length) { continue }
        for (let k in perm.classifications) {
          let classification = perm.classifications[k]
          if (!classification.public) { continue }
          if (!map.hasOwnProperty(classification.label)) {
            map[classification.label] = []
          }
          map[classification.label].push(new Solution(perm, classification))
        }
      }

      // single-word spans
      for (let j = 0; j < section.child.length; j++) {
        let word = section.child[j]
        let keys = Object.keys(word.classifications)
        if (!keys.length) { continue }
        for (let k in word.classifications) {
          let classification = word.classifications[k]
          if (!classification.public) { continue }
          if (!map.hasOwnProperty(classification.label)) {
            map[classification.label] = []
          }
          map[classification.label].push(new Solution(word, classification))
        }
      }
    }

    return map
  }
}

module.exports = HashMapSolver
