const HashMapSolver = require('./super/HashMapSolver')

class ExclusiveCarseianSolver extends HashMapSolver {
  solve (tokenizer) {
    let map = this.generateHashMap(tokenizer)
    let solutions = this.exclusiveCartesian.apply(null, Object.keys(map).map(k => map[k]))
    tokenizer.solution = tokenizer.solution.concat(solutions)
  }

  // compute the unique cartesian product
  // (all permutations of non-overlapping tokens from different classifications)
  exclusiveCartesian () {
    let r = []; let arg = arguments; let max = arg.length - 1
    if (!arg.length) { return r }
    const helper = (arr, i) => {
      for (let j = 0, l = arg[i].length; j < l; j++) {
        let a = arr.slice(0) // clone arr

        // exclusive - same span range cannot appear twice
        if (!isRangeConflict(a, arg[i][j].span)) {
          a.push(arg[i][j])
        }

        if (i === max) {
          // duplicates - prevent duplicate solutions
          if (!isDuplicateSolutionArray(r, a)) {
            r.push(a)
          }
        } else {
          helper(a, i + 1)
        }
      }
    }
    helper([], 0)
    return r
  }
}

// check that the span does not intersect with existing ranges in arr
function isRangeConflict (arr, span) {
  let isUsed = false
  for (let i = 0; i < arr.length; i++) {
    if (span.intersects(arr[i].span)) {
      isUsed = true
      break
    }
  }
  return isUsed
}

// check that this is not a duplicate of an existing array of solution
// @todo: deduplicate out-of-order yet the same arrays
function isDuplicateSolutionArray (rows, arr) {
  return rows.some(rrow => {
    if (arr.length !== rrow.length) { return false }
    return rrow.every((v, i) => v.equals(arr[i]))
  })
}

module.exports = ExclusiveCarseianSolver
