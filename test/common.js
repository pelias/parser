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

const assertHelper = (test, parser, firstOnly) => {
  let p = (parser || globalParser)
  return (input, expected) => {
    let tokenizer = new Tokenizer(input)
    p.classify(tokenizer)
    p.solve(tokenizer)
    test(input, (t) => {
      let ext = extract(tokenizer)
      t.deepEquals(firstOnly === false ? ext : ext[0], expected)
      t.end()
    })
  }
}

const assertFirstMatch = (test, parser) => {
  return assertHelper(test, parser, true)
}

const assertAllMatch = (test, parser) => {
  return assertHelper(test, parser, false)
}

module.exports.assertFirstMatch = assertFirstMatch
module.exports.assertAllMatch = assertAllMatch
module.exports.extract = extract
module.exports.parser = globalParser
