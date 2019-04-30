const Solution = require('./Solution')
const HashMapSolver = require('./super/HashMapSolver')

class ExclusiveCartesianSolver extends HashMapSolver {
  solve (tokenizer) {
    let map = this.generateHashMap(tokenizer)
    let solutions = this.exclusiveCartesian.apply(null, Object.keys(map).map(k => map[k]))
    tokenizer.solution = tokenizer.solution.concat(solutions)
  }

  // compute the unique cartesian product
  // (all phrases of non-overlapping tokens from different classifications)
  exclusiveCartesian () {
    let solutions = []

    // generate a flattened array of SolutionPairs
    let pairs = []
    Array.prototype.slice.call(arguments).forEach(a => { pairs = pairs.concat(a.pair) })

    // iterate all pairs twice (once as $i and once as $j)
    for (let i = 0; i < pairs.length; i++) {
      let solution = new Solution()
      solution.pair.push(pairs[i])
      for (let j = 0; j < pairs.length; j++) {
        // do not add the same pair twice
        if (j === i) { continue }

        // do not add another pair from an existing classification
        if (solution.pair.some(p => {
          return p.classification.constructor.name === pairs[j].classification.constructor.name
        })) {
          continue
        }

        // so not add a pair where the span intersects an existing pair
        if (solution.pair.some(p => p.span.intersects(pairs[j].span))) {
          continue
        }
        solution.pair.push(pairs[j])
      }
      solutions.push(solution)
    }

    return solutions
  }
}

module.exports = ExclusiveCartesianSolver
