const util = require('util')
const pretty = require('./pretty')
const Tokenizer = require('../tokenization/Tokenizer')
const HouseNumberClassifier = require('../classifier/HouseNumberClassifier')
const PostcodeClassifier = require('../classifier/PostcodeClassifier')
const StreetClassifier = require('../classifier/StreetClassifier')
const DirectionalClassifier = require('../classifier/DirectionalClassifier')
const OrdinalClassifier = require('../classifier/OrdinalClassifier')
const input = process.argv.slice(2).join(' ')

// tokenizer
var start = new Date()
const t = new Tokenizer(input)
pretty.tokenizer(t, util.format('(%sms)', new Date() - start))

// housenumber classifier
start = new Date()
const hn = new HouseNumberClassifier()
hn.classify(t)
pretty.classifier(hn, util.format('housenumber (%sms)', new Date() - start))

// postcode classifier
start = new Date()
const pc = new PostcodeClassifier()
pc.classify(t)
pretty.classifier(pc, util.format('postcode (%sms)', new Date() - start))

// street classifier
start = new Date()
const sc = new StreetClassifier()
sc.classify(t)
pretty.classifier(sc, util.format('street (%sms)', new Date() - start))

// directional classifier
start = new Date()
const dc = new DirectionalClassifier()
dc.classify(t)
pretty.classifier(dc, util.format('directional (%sms)', new Date() - start))

// directional classifier
start = new Date()
const oc = new OrdinalClassifier()
oc.classify(t)
pretty.classifier(oc, util.format('ordinal (%sms)', new Date() - start))
