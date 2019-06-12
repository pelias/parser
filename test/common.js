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

const assert = (test, parser) => {
  let p = (parser || globalParser)
  return (input, expected, firstOnly) => {
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

module.exports.assert = assert
module.exports.extract = extract
module.exports.parser = globalParser
