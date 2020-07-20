const Tokenizer = require('../../tokenization/Tokenizer')
const DebugOutputBuilder = require('../../debug/DebugOutputBuilder')

module.exports = function (req, res) {
  // address parser
  var parser = req.app.locals.parser.address

  // input text
  var text = req.query.text || ''

  // tokenizer
  const t = new Tokenizer(text)
  parser.classify(t)
  parser.solve(t)

  // send json
  res.status(200).json({
    input: {
      body: t.span.body,
      start: t.span.start,
      end: t.span.end
    },
    solutions: t.solution.map(jsonify),
    debug: req.query.debug && new DebugOutputBuilder().parse(text).toString()
  })
}

function jsonify (solution) {
  return {
    score: solution.score,
    classifications: solution.pair.map(c => {
      return {
        label: c.classification.label,
        value: c.span.body,
        // confidence: c.classification.confidence,
        start: c.span.start,
        end: c.span.end
      }
    })
  }
}
