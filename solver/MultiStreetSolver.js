const HashMapSolver = require('./super/HashMapSolver')

/**
 * If a 'multistreet' classification was detected then
 * add a new solution which covers all streets included.
 */

class MultiStreetSolver extends HashMapSolver {
  solve (tokenizer) {
    let map = this.generateHashMap(tokenizer, true)

    // sanity checking
    if (!map.hasOwnProperty('multistreet')) { return }
    if (!map.hasOwnProperty('street') || map.street.pair.length < 2) { return }

    // sort streets from longest to shortest string length.
    // this favours longer street names over their shorter substrings.
    let streets = map.street.copy()
    streets.pair = streets.pair.sort((a, b) => b.span.norm.length - a.span.norm.length)

    tokenizer.solution.forEach(solution => {
      let sol = solution.copy()

      map.multistreet.pair.forEach(multi => {
        // find all street tokens which intersect the 'multistreet' span
        // and also do not overlap an existing pair in this solution.
        streets.pair.forEach(s => {
          if ((
            s.span.intersects(multi.span) &&
            (s.classification.constructor.name === 'StreetClassification') &&
            !sol.pair.some(sp => sp.span.intersects(s.span))
          )) {
            sol.pair.push(s)
          }
        })

        // if more than one street was detected then add this as a new solution
        if (sol.pair.length > 1) {
          tokenizer.solution.push(sol)
        }
      })
    })
  }
}

module.exports = MultiStreetSolver
