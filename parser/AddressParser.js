const Parser = require('./Parser')
const AlphaNumericClassifier = require('../classifier/AlphaNumericClassifier')
const HouseNumberClassifier = require('../classifier/HouseNumberClassifier')
const PostcodeClassifier = require('../classifier/PostcodeClassifier')
const StreetPrefixClassifier = require('../classifier/StreetPrefixClassifier')
const StreetSuffixClassifier = require('../classifier/StreetSuffixClassifier')
const CompoundStreetClassifier = require('../classifier/CompoundStreetClassifier')
const DirectionalClassifier = require('../classifier/DirectionalClassifier')
const OrdinalClassifier = require('../classifier/OrdinalClassifier')
const StopWordsClassifier = require('../classifier/StopWordsClassifier')
const PersonClassifier = require('../classifier/PersonClassifier')
const GivenNameClassifier = require('../classifier/GivenNameClassifier')
const SurnameClassifier = require('../classifier/SurnameClassifier')
const PersonalSuffixClassifier = require('../classifier/PersonalSuffixClassifier')
const ChainClassifier = require('../classifier/ChainClassifier')
const IntersectionClassifier = require('../classifier/IntersectionClassifier')
// const MultiStreetClassifier = require('../classifier/MultiStreetClassifier')
const CompositeClassifier = require('../classifier/CompositeClassifier')
const WhosOnFirstClassifier = require('../classifier/WhosOnFirstClassifier')
// const AdjacencyClassifier = require('../classifier/AdjacencyClassifier')
const ExclusiveCartesianSolver = require('../solver/ExclusiveCartesianSolver')
const LeadingAreaDeclassifier = require('../solver/LeadingAreaDeclassifier')
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
        new StreetPrefixClassifier(),
        new StreetSuffixClassifier(),
        new CompoundStreetClassifier(),
        new DirectionalClassifier(),
        new OrdinalClassifier(),
        new StopWordsClassifier(),

        // phrase classifiers
        new IntersectionClassifier(),
        new PersonClassifier(),
        new GivenNameClassifier(),
        new SurnameClassifier(),
        new PersonalSuffixClassifier(),
        new ChainClassifier(),
        new WhosOnFirstClassifier(),

        // composite classifiers
        new CompositeClassifier(require('../classifier/scheme/street')),
        new CompositeClassifier(require('../classifier/scheme/intersection'))
      ],
      // solvers
      [
        new ExclusiveCartesianSolver(),
        new LeadingAreaDeclassifier(),
        new MultiStreetSolver(),
        new TokenDistanceFilter(),
        new SubsetFilter()
      ]
    )
  }
}

module.exports = AddressParser
