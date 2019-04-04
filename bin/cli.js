const util = require('util')
const pretty = require('./pretty')
const Tokenizer = require('../tokenization/Tokenizer')
const AddressParser = require('../parser/AddressParser')
const input = process.argv.slice(2).join(' ')

// tokenizer
var start = new Date()
const t = new Tokenizer(input)
let took = new Date() - start
pretty.tokenizer(t, util.format('(%sms)', took))

// parser
const parser = new AddressParser()
took = parser.classify(t)
pretty.classifications(t, util.format('(%sms)', took))
took = parser.solve(t)
pretty.solutions(t, util.format('(%sms)', took))
