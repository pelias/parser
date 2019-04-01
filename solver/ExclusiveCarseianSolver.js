const HashMapSolver = require('./super/HashMapSolver')

class ExclusiveCarseianSolver extends HashMapSolver {
  solve (tokenizer) {
    let map = this.generateHashMap(tokenizer)
    tokenizer.solution = tokenizer.solution.concat(
      this.exclusiveCartesian.apply(null, Object.keys(map).map(k => map[k]))
    )
  }

  // compute the unique cartesian product
  // (all permutations of non-overlapping tokens from different classifications)
  exclusiveCartesian () {
    let r = []; let arg = arguments; let max = arg.length - 1
    const helper = (arr, i) => {
      for (let j = 0, l = arg[i].length; j < l; j++) {
        let a = arr.slice(0) // clone arr

        // exclusive - same span cannot appear twice
        let exists = false
        for (let k = 0; k < a.length; k++) {
          if (a[k].span.intersects(arg[i][j].span)) {
            exists = true
            break
          }
        }
        if (!exists) { a.push(arg[i][j]) }
        if (i === max) { r.push(a) } else { helper(a, i + 1) }
      }
    }
    helper([], 0)
    return r
  }
}

module.exports = ExclusiveCarseianSolver
