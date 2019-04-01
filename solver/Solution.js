class Solution {
  constructor (span, classification) {
    this.span = span
    this.classification = classification
  }

  equals (solution) {
    return (
      this.span === solution.span &&
      this.classification.equals(solution.classification)
    )
  }
}

module.exports = Solution
