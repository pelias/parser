const HashMapSolver = require('./super/HashMapSolver')

/**
 * If a 'multistreet' classification was detected then
 * add a new solution which covers all streets included.
 */

class MultiStreetSolver extends HashMapSolver {
  solve (tokenizer) {
    let map = this.generateHashMap(tokenizer, true)

    // sanity checking
    if (!map.hasOwnProperty('multistreet') || map.multistreet.pair.length < 1) { return }
    if (!map.hasOwnProperty('street') || map.street.pair.length < 2) { return }

    // only currently consider one multistreet parse (for simplicity)
    // @todo: there may be some rare cases where we detect more than one?
    const multi = map.multistreet.pair[0]

    // generate a list of streets which intersect the multistreet
    const streets = map.street.pair.filter(s => s.span.intersects(multi.span))
    if (streets.length < 2) { return }

    // iterate over existing solutionss
    tokenizer.solution.filter(solution => {
      // solution must contain a street and also that street must intersect
      // the multistreet classification.
      return solution.pair.some(s => (
        s.classification.constructor.name === 'StreetClassification' &&
        s.span.intersects(multi.span)
      ))
    }).forEach(solution => {
      // find the location of the street classification
      let street = solution.pair.find(s => s.classification.constructor.name === 'StreetClassification')

      // make a copy of the current solution and remove all classifications
      // which came before the street (such as venue, housenumber etc.)
      let truncated = solution.copy()
      truncated.pair = truncated.pair.filter(s => s.span.start >= street.span.start)

      // find all street classsification which intersect the 'multistreet' span
      // and also do not overlap an existing pair in this solution.
      streets.forEach(s => {
        if (truncated.pair.every(p => !p.span.intersects(s.span))) {
          let intersection = truncated.copy()
          intersection.pair.push(s)
          tokenizer.solution.push(intersection)
        }
      })
    })
  }
}

module.exports = MultiStreetSolver
