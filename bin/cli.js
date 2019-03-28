const util = require('util')
const Tokenizer = require('../tokenization/Tokenizer')
const pretty = require('./pretty')

const text = process.argv.slice(2).join(' ')

const start = new Date()
const t = new Tokenizer( text )
const end = new Date()

pretty.tokenizer( t, util.format('(%sms)', end-start ) )