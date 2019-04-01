const HashMapSolver = require('./super/HashMapSolver')

class MultiStreetSolver extends HashMapSolver {
  solve (tokenizer) {
    let map = this.generateHashMap(tokenizer, true)

    // sanity checking
    if (!map.hasOwnProperty('multistreet')) { return }
    if (!map.hasOwnProperty('street') || map.street.length < 2) { return }

    let multi = map.multistreet[0]
    let candidates = map.street.slice(0)

    // add the second street to existing solutions
    for (let s = 0; s < tokenizer.solution.length; s++) {
      let sol = tokenizer.solution[s].slice(0) // make a copy
      let success = false

      for (let i = 0; i < candidates.length; i++) {
        let s = candidates[i]
        if ((
          s.span.intersects(multi.span) &&
          !sol.some(ss => ss.span.intersects(s.span))
        )) {
          sol.push(s)
          success = true
          break
        }
      }
      if (success) {
        tokenizer.solution.push(sol)
        candidates = candidates.filter(c => c === sol[sol.length - 1])
      }
    }
  }
}

module.exports = MultiStreetSolver
