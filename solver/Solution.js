class Solution {
  constructor (pairs) {
    this.pair = pairs || []
    this.score = 0.0 // absolute score
  }

  // create a deep copy of this solution
  copy () {
    return new Solution(this.pair.slice(0))
  }

  computeScore (tokenizer) {
    // iterate pairs to compute a score
    let score = this.pair.reduce((memo, cur) => {
      // use the span range if it does not have children
      let range = cur.span.end - cur.span.start

      // if it does have children, iterate them so that
      // delimiters such as spaces are not counted in the range
      if (cur.span.child.length) {
        range = cur.span.child.reduce((sum, child) => { return sum + (child.end - child.start) }, 0)
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
    this.score = (score.confidence / score.coverage) * (score.coverage / tokenizer.coverage)
  }

  // @todo implement this
  // equals(solution) {}
}

module.exports = Solution