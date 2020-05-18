const Tokenizer = require('../tokenization/Tokenizer')
const AddressParser = require('../parser/AddressParser')
const globalParser = new AddressParser()

const extract = (tokenizer) => {
  return tokenizer.solution.map(s => s.pair.map(c => {
    return {
      [c.classification.label]: c.span.body
      // offset: c.span.start
    }
  }))
}

// Test if the first solution returned by parser matches the solution in "expected"
const assertFirstSolution = (test, parser) => {
  let p = (parser || globalParser)
  return (input, expected) => {
    let tokenizer = new Tokenizer(input)
    p.classify(tokenizer)
    p.solve(tokenizer)
    test(input, (t) => {
      let ext = extract(tokenizer)
      t.deepEquals(ext[0], expected)
      t.end()
    })
  }
}

// Test if the first N solutions returned by parser matches the solutions
// in "expected," where N is the length of expected.
const assertFirstSolutions = (test, parser) => {
  let p = (parser || globalParser)
  return (input, expected) => {
    let tokenizer = new Tokenizer(input)
    p.classify(tokenizer)
    p.solve(tokenizer)
    test(input, (t) => {
      let ext = extract(tokenizer)
      t.deepEquals(ext.slice(0, expected.length), expected)
      t.end()
    })
  }
}

module.exports.assertFirstSolution = assertFirstSolution
module.exports.assertFirstSolutions = assertFirstSolutions
module.exports.extract = extract
module.exports.parser = globalParser
