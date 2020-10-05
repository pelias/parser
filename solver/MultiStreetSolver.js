const _ = require('lodash')
const HashMapSolver = require('./super/HashMapSolver')

// classifications which are more granular than StreetClassification
// should not be included in intersection solutions.
const MORE_GRANULAR_THAN_STREET = [
  'HouseNumberClassification',
  'UnitClassification',
  'UnitTypeClassification',
  'VenueClassification'
]

/**
 * If a 'multistreet' classification was detected then
 * add a new solution which covers all streets included.
 *
 * The ExclusiveCartesianSolver ensures that each public classification
 * can exist only once per solution (ie. we can't have two postalcodes).
 *
 * Intersections are the only exception to this rule, so rather than
 * modifying the ExclusiveCartesianSolver we use this solver to create
 * the missing intersection solutions (those with 2x 'street' labels).
 *
 * One of the challenges is that there could be many different interpretations
 * of the admin tokens, so we need to ensure that each of those permutations
 * is also represented by a distinct intersection solution.
 *
 * The solver works by iterating over existing solutions looking for any
 * which identified a street, it then clones that solution, removes any tokens
 * less granular than street and attempts to add the new street token in its
 * place.
 *
 * Care is taken to ensure that the resulting solution does not contain
 * tokens in overlapping positions.
 */

class MultiStreetSolver extends HashMapSolver {
  solve (tokenizer) {
    let map = this.generateHashMap(tokenizer, true)

    // sanity checking
    if (_.get(map, 'multistreet.pair.length', 0) < 1) { return }
    if (_.get(map, 'street.pair.length', 0) < 2) { return }

    // only currently consider one multistreet parse (for simplicity)
    // @todo: there may be some rare cases where we detect more than one?
    const multi = _.first(map.multistreet.pair)

    // generate a list of streets which intersect the multistreet
    const streets = map.street.pair.filter(s => s.span.intersects(multi.span))
    if (streets.length < 2) { return }

    // generate a list of candidate solutions which could potentially be
    // cloned to generate new intersection solutions
    let candidates = tokenizer.solution.filter(solution => {
      // candidate solution must contain a street and also that street
      // must intersect the multistreet classification.
      return solution.pair.some(s => (
        s.classification.constructor.name === 'StreetClassification' &&
        s.span.intersects(multi.span)
      ))
    })

    // truncate the candidates by making a copy of the current solution and removing all solution
    // pairs which came before the street and also any pairs less granular than street
    // (such as venue, housenumber etc.)
    candidates = candidates.map(solution => {
      // find the street solution pair (there should be exactly one)
      const street = solution.pair.find(s => s.classification.constructor.name === 'StreetClassification')

      // remove some pairs from the solution
      const truncated = solution.copy()
      truncated.pair = truncated.pair.filter(s => (
        (s.span.start >= street.span.start) &&
        !MORE_GRANULAR_THAN_STREET.includes(s.classification.constructor.name)
      ))

      return truncated
    })

    // the truncation step above can generate duplicate solutions so a 'content hash'
    // is generated in order to deduplicate them.
    // note: this is purely a performance optimization as it generates fewer candidates
    candidates = _.uniqBy(candidates, truncated => {
      return truncated.pair.map(p => `${p.classification.label}:${p.span.norm}`).join('_')
    })

    // iterate over candidates and generate new intersection solutions
    candidates.forEach(truncated => {
      // find all street classsifications which intersect the 'multistreet' span
      // and also do not overlap an existing pair in this solution.
      streets.forEach(street => {
        if (truncated.pair.every(p => !p.span.intersects(street.span))) {
          // make a copy of the truncated solution and add the additional street
          let intersection = truncated.copy()
          intersection.pair.push(street)

          // append this solution
          tokenizer.solution.push(intersection)
        }
      })
    })
  }
}

module.exports = MultiStreetSolver
