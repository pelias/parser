const Parser = require('./Parser')
const AlphaNumericClassifier = require('../classifier/AlphaNumericClassifier')
const HouseNumberClassifier = require('../classifier/HouseNumberClassifier')
const PostcodeClassifier = require('../classifier/PostcodeClassifier')
const StreetSuffixClassifier = require('../classifier/StreetSuffixClassifier')
const CompoundStreetClassifier = require('../classifier/CompoundStreetClassifier')
const DirectionalClassifier = require('../classifier/DirectionalClassifier')
const OrdinalClassifier = require('../classifier/OrdinalClassifier')
const IntersectionClassifier = require('../classifier/IntersectionClassifier')
const MultiStreetClassifier = require('../classifier/MultiStreetClassifier')
const CompositeClassifier = require('../classifier/CompositeClassifier')
// const AdjacencyClassifier = require('../classifier/AdjacencyClassifier')
const ExclusiveCartesianSolver = require('../solver/ExclusiveCartesianSolver')
const MultiStreetSolver = require('../solver/MultiStreetSolver')
const TokenDistanceFilter = require('../solver/TokenDistanceFilter')
const SubsetFilter = require('../solver/SubsetFilter')

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
        new StreetSuffixClassifier(),
        new CompoundStreetClassifier(),
        new DirectionalClassifier(),
        new OrdinalClassifier(),
        new IntersectionClassifier(),

        // phrase classifiers
        new CompositeClassifier(require('../classifier/scheme/street')),
        new CompositeClassifier(require('../classifier/scheme/intersection')),

        // section classifiers
        // new AdjacencyClassifier(), // currently doesn't have any consumers
        new MultiStreetClassifier() // hoping to retire this classifier
      ],
      // solvers
      [
        new ExclusiveCartesianSolver(),
        new MultiStreetSolver(),
        new TokenDistanceFilter(),
        new SubsetFilter()
      ]
    )
  }
}

module.exports = AddressParser
