// remove solutions which are a subset of other solutions

class SubsetFilter {
  solve (tokenizer) {
    tokenizer.solution = tokenizer.solution.filter((s, i) => {
      for (let j = 0; j < tokenizer.solution.length; j++) {
        if (i === j) { return true } // do not check itself
        if (tokenizer.solution[i].coversSameClassification(s)) { return false }
      }
      return true
    })
  }
}

module.exports = SubsetFilter
