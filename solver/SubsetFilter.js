// remove solutions which are a subset of other solutions

class SubsetFilter {
  solve (tokenizer) {
    tokenizer.solution = tokenizer.solution.filter((s, i) => {
      for (let j = 0; j < tokenizer.solution.length; j++) {
        // do not check itself
        if (i === j) { return true }

        // do not filter solutions with the same score
        // do not favour solutions with lower scores (if for any reason they are not sorted)
        if (tokenizer.solution[i].score <= s.score) { return false }

        // if two solutions cover the same tokens, remove one of them
        if (tokenizer.solution[i].coversSameClassification(s)) { return false }
      }
      return true
    })
  }
}

module.exports = SubsetFilter
