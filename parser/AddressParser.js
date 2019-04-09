const Parser = require('./Parser')
const AlphaNumericClassifier = require('../classifier/AlphaNumericClassifier')
const HouseNumberClassifier = require('../classifier/HouseNumberClassifier')
const PostcodeClassifier = require('../classifier/PostcodeClassifier')
const StreetClassifier = require('../classifier/StreetClassifier')
const DirectionalClassifier = require('../classifier/DirectionalClassifier')
const OrdinalClassifier = require('../classifier/OrdinalClassifier')
const IntersectionClassifier = require('../classifier/IntersectionClassifier')
const MultiStreetClassifier = require('../classifier/MultiStreetClassifier')
const CompositeClassifier = require('../classifier/CompositeClassifier')
const AdjacencyClassifier = require('../classifier/AdjacencyClassifier')
const ExclusiveCartesianSolver = require('../solver/ExclusiveCartesianSolver')
const MultiStreetSolver = require('../solver/MultiStreetSolver')

class AddressParser extends Parser {
  constructor () {
    super(
      // classifiers
      [
        // generic word classifiers
        new AlphaNumericClassifier(),

        // word classifiers
        new HouseNumberClassifier(),
        new PostcodeClassifier(),
        new StreetClassifier(),
        new DirectionalClassifier(),
        new OrdinalClassifier(),
        new IntersectionClassifier(),

        // permutation classifiers
        new CompositeClassifier(require('../classifier/scheme/street')),
        new CompositeClassifier(require('../classifier/scheme/intersection')),

        // section classifiers
        new AdjacencyClassifier(),
        new MultiStreetClassifier()
      ],
      // solvers
      [
        new ExclusiveCartesianSolver(),
        new MultiStreetSolver()
      ]
    )
  }
}

module.exports = AddressParser
