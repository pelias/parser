class Solution {
  constructor (pairs) {
    this.pair = pairs || []
    this.coverage = 0.0 // % of characters covered
    this.confidence = 0.0 // avg confidence
    this.score = 0.0 // absolute score
  }

  // create a deep copy of this solution
  copy () {
    return new Solution(this.pair.slice(0))
  }

  computeScore (tokenizer) {
    // total characters covered
    this.coverage = this.pair.reduce(
      (sum, cur) => sum + cur.span.end - cur.span.start, 0
    )

    // average confidence
    this.confidence = this.pair.reduce(
      (sum, cur) => sum + cur.classification.confidence, 0
    ) / this.pair.length

    // absolute coverage
    this.score = this.confidence * (this.coverage / tokenizer.coverage)
  }

  // @todo implement this
  // equals(solution) {}
}

module.exports = Solution
