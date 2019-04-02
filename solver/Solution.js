class Solution {
  constructor (pairs) {
    this.pair = pairs || []
  }

  // create a deep copy of this solution
  copy () {
    return new Solution(this.pair.slice(0))
  }

  // @todo implement this
  // equals(solution) {}
}

module.exports = Solution
