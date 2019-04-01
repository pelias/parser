const util = require('util')
const pretty = require('./pretty')
const Tokenizer = require('../tokenization/Tokenizer')
const AlphaNumericClassifier = require('../classifier/AlphaNumericClassifier')
const HouseNumberClassifier = require('../classifier/HouseNumberClassifier')
const PostcodeClassifier = require('../classifier/PostcodeClassifier')
const StreetClassifier = require('../classifier/StreetClassifier')
const DirectionalClassifier = require('../classifier/DirectionalClassifier')
const OrdinalClassifier = require('../classifier/OrdinalClassifier')
const MultiWordStreetClassifier = require('../classifier/MultiWordStreetClassifier')
const ExclusiveCarseianSolver = require('../solver/ExclusiveCarseianSolver')
const input = process.argv.slice(2).join(' ')

// tokenizer
var start = new Date()
const t = new Tokenizer(input)
pretty.tokenizer(t, util.format('(%sms)', new Date() - start))

// enabled classifiers
const classifiers = [

  // generic word classifiers
  new AlphaNumericClassifier(),

  // single-word classifiers
  new HouseNumberClassifier(),
  new PostcodeClassifier(),
  new StreetClassifier(),
  new DirectionalClassifier(),
  new OrdinalClassifier(),

  // multi-word classifiers
  new MultiWordStreetClassifier()
]

// run all classifiers
start = new Date()
classifiers.forEach(c => c.classify(t))
pretty.classifications(t, util.format('(%sms)', new Date() - start))

const solvers = [
  new ExclusiveCarseianSolver()
]

// run all solvers
start = new Date()
solvers.forEach(c => c.solve(t))
pretty.solutions(t, util.format('(%sms)', new Date() - start))
