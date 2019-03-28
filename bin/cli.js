const util = require('util')
const pretty = require('./pretty')
const Tokenizer = require('../tokenization/Tokenizer')
const HouseNumberClassifier = require('../classifier/housenumber/HouseNumberClassifier')
const PostcodeClassifier = require('../classifier/postcode/PostcodeClassifier')
const input = process.argv.slice(2).join(' ')

// tokenizer
var start = new Date()
const t = new Tokenizer( input )
pretty.tokenizer( t, util.format('(%sms)', new Date()-start ) )

// housenumber classifier
start = new Date()
const hn = new HouseNumberClassifier()
hn.classify( t )
pretty.classifier( hn, util.format('housenumber (%sms)', new Date()-start ) )

// postcode classifier
start = new Date()
const pc = new PostcodeClassifier()
pc.classify(t)
pretty.classifier(pc, util.format('postcode (%sms)', new Date() - start))