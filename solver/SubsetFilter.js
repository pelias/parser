// remove solutions which are a subset of other solutions

class SubsetFilter {
  solve (tokenizer) {
    for (let i = 0; i < tokenizer.solution.length; i++) {
      tokenizer.solution = tokenizer.solution.filter((s, j) => {
        if (j <= i) { return true }

        // do not favour solutions with lower scores (if for any reason they are not sorted)
        if (tokenizer.solution[i].score < s.score) { return false }

        // if two solutions cover the same tokens, remove the latter
        if (tokenizer.solution[i].coversSameClassification(s)) { return false }

        return true
      })
    }
  }
}

module.exports = SubsetFilter
