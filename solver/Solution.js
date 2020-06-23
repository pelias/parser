class Solution {
  constructor (pairs) {
    this.pair = pairs || []
    this.score = 0.0 // absolute score
    this.penalty = 0.0
  }

  // create a deep copy of this solution
  copy () {
    return new Solution(this.pair.slice(0))
  }

  // return true if $this totally covers the target solution
  // ie. target solution is a subset of $this without any unique ranges
  covers (solution) {
    return solution.pair.every(p => this.pair.some(pp => pp.span.covers(p.span)))
  }

  // same as above but classifications must also match
  coversSameClassification (solution) {
    return solution.pair.every(p => this.pair.some(pp => {
      return (
        pp.classification.constructor.name === p.classification.constructor.name &&
        pp.span.covers(p.span)
      )
    }))
  }

  computeScore (tokenizer) {
    // iterate pairs to compute a score
    let score = this.pair.reduce((memo, cur) => {
      // use the span range if it does not have children
      let range = cur.span.end - cur.span.start

      // if it does have children, iterate them so that
      // delimiters such as spaces are not counted in the range
      if (cur.span.graph.length('child')) {
        range = cur.span.graph.findAll('child').reduce((sum, child) => {
          return sum + (child.end - child.start)
        }, 0)
      }

      // total characters covered
      memo.coverage += range

      // confidence of match multiplied by characters covered
      memo.confidence += (cur.classification.confidence * range)
      return memo
    },
    { coverage: 0, confidence: 0 }
    )

    // absolute score
    // the average character score coveered divided by the total coverage
    this.score = (score.confidence / score.coverage) * (score.coverage / tokenizer.coverage) * (1.0 - this.penalty)
  }

  // return a mask of the input for this solution
  // which shows the areas covered by different types of classification
  // N = housenumber, S = street, P = postcode, A = administrative, U = unit
  mask (tokenizer) {
    // use the original input, mask should be the same length
    let body = tokenizer.span.body
    let mask = Array(body.length).fill(' ')
    let map = {
      'venue': 'V',
      'housenumber': 'N',
      'street': 'S',
      'postcode': 'P',
      'unit': 'U',
      'unit_type': 'U',
      'default': 'A'
    }

    // scan the input letter-by-letter from left-to-right
    for (let i = 0; i < body.length; i++) {
      // find which fields cover this character (should only be covered by 0 or 1 field)
      let coveredBy = this.pair.filter(p => p.span.start <= i && p.span.end >= i)

      if (coveredBy.length) {
        let label = coveredBy[0].classification.label
        let code = map.hasOwnProperty(label) ? map[label] : map.default
        for (let j = coveredBy[0].span.start; j < coveredBy[0].span.end; j++) {
          mask[j] = code
        }

        // skip forward to avoid scanning the same token again
        i = coveredBy[0].span.end
      }
    }

    return mask.join('')
  }

  // @todo implement this
  // equals(solution) {}
}

module.exports = Solution
