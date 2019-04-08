const Solution = require('./Solution')
const HashMapSolver = require('./super/HashMapSolver')

class ExclusiveCarseianSolver extends HashMapSolver {
  solve (tokenizer) {
    let map = this.generateHashMap(tokenizer)
    let solutions = this.exclusiveCartesian.apply(null, Object.keys(map).map(k => map[k]))
    solutions.forEach(s => s.computeScore(tokenizer))
    tokenizer.solution = tokenizer.solution.concat(solutions)
    tokenizer.solution.sort((a, b) => b.score - a.score) // sort results by score desc
    tokenizer.solution.forEach(s => s.pair.sort((a, b) => a.span.start - b.span.start)) // sort by span start
  }

  // compute the unique cartesian product
  // (all permutations of non-overlapping tokens from different classifications)
  exclusiveCartesian () {
    let r = []; let arg = arguments; let max = arg.length - 1
    if (!arg.length) { return r }
    const helper = (solution, i) => {
      for (let j = 0, l = arg[i].pair.length; j < l; j++) {
        let copy = solution.copy() // clone solution

        // exclusive - same span range cannot appear twice
        if (!isRangeConflict(copy, arg[i].pair[j].span)) {
          copy.pair.push(arg[i].pair[j])
        }

        if (i === max) {
          // duplicates - prevent duplicate solutions
          if (!isDuplicateSolutionArray(r, copy)) {
            r.push(copy)
          }
        } else {
          helper(copy, i + 1)
        }
      }
    }
    helper(new Solution(), 0)
    return r
  }
}

// check that the span does not intersect with existing ranges in arr
function isRangeConflict (solution, span) {
  let isUsed = false
  for (let i = 0; i < solution.pair.length; i++) {
    if (span.intersects(solution.pair[i].span)) {
      isUsed = true
      break
    }
  }
  return isUsed
}

// check that this is not a duplicate of an existing array of solution
// @todo: deduplicate out-of-order yet the same arrays
function isDuplicateSolutionArray (solutions, solution) {
  return solutions.some(sol => {
    if (solution.pair.length !== sol.pair.length) { return false }
    return sol.pair.every((v, i) => v.equals(solution.pair[i]))
  })
}

module.exports = ExclusiveCarseianSolver
