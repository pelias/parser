const Solution = require('./Solution')
const HashMapSolver = require('./super/HashMapSolver')
const MAX_RECURSION = 10
const MAX_SOLUTIONS = 50000

class ExclusiveCartesianSolver extends HashMapSolver {
  solve (tokenizer) {
    let map = this.generateHashMap(tokenizer, false, true)
    let solutions = this.exclusiveCartesian.apply(null, Object.keys(map).map(k => map[k]).reverse())
    tokenizer.solution = tokenizer.solution.concat(solutions)
  }

  // compute the unique cartesian product
  // (all permutations of non-overlapping tokens from different classifications)
  exclusiveCartesian () {
    let r = []; let arg = arguments; let max = arg.length - 1
    if (!arg.length) { return r }
    const helper = (solution, i) => {
      for (let j = 0, l = arg[i].pair.length; j < l; j++) {
        let copy = solution.copy() // clone solution
        if (arg[i].pair[j].span.body.length) {
          copy.pair.push(arg[i].pair[j])
        }
        if (i === max) {
          if (copy.pair.length && r.length < MAX_SOLUTIONS) {
            r.push(copy)
          }
        } else if (i < MAX_RECURSION) {
          helper(copy, i + 1)
        }
      }
    }
    helper(new Solution(), 0)

    // reverse order
    r = r.reverse()

    // do not add a pair where the span intersects an existing pair
    r = r.filter(s => {
      return !s.pair.some((p1, i1) => {
        return s.pair.some((p2, i2) => {
          if (i2 <= i1) { return false }
          return p1.span.intersects(p2.span)
        })
      })
    })

    return r
  }
}

module.exports = ExclusiveCartesianSolver
