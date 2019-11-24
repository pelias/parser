const Parser = require('./Parser')
const AlphaNumericClassifier = require('../classifier/AlphaNumericClassifier')
const TokenPositionClassifier = require('../classifier/TokenPositionClassifier')
const HouseNumberClassifier = require('../classifier/HouseNumberClassifier')
const PostcodeClassifier = require('../classifier/PostcodeClassifier')
const StreetPrefixClassifier = require('../classifier/StreetPrefixClassifier')
const StreetSuffixClassifier = require('../classifier/StreetSuffixClassifier')
const RoadTypeClassifier = require('../classifier/RoadTypeClassifier')
const ToponymClassifier = require('../classifier/ToponymClassifier')
const CompoundStreetClassifier = require('../classifier/CompoundStreetClassifier')
const DirectionalClassifier = require('../classifier/DirectionalClassifier')
const OrdinalClassifier = require('../classifier/OrdinalClassifier')
const StopWordClassifier = require('../classifier/StopWordClassifier')
const PersonClassifier = require('../classifier/PersonClassifier')
const GivenNameClassifier = require('../classifier/GivenNameClassifier')
const SurnameClassifier = require('../classifier/SurnameClassifier')
const PersonalSuffixClassifier = require('../classifier/PersonalSuffixClassifier')
const PersonalTitleClassifier = require('../classifier/PersonalTitleClassifier')
const ChainClassifier = require('../classifier/ChainClassifier')
const PlaceClassifier = require('../classifier/PlaceClassifier')
const IntersectionClassifier = require('../classifier/IntersectionClassifier')
// const MultiStreetClassifier = require('../classifier/MultiStreetClassifier')
const CompositeClassifier = require('../classifier/CompositeClassifier')
const WhosOnFirstClassifier = require('../classifier/WhosOnFirstClassifier')
// const AdjacencyClassifier = require('../classifier/AdjacencyClassifier')
const ExclusiveCartesianSolver = require('../solver/ExclusiveCartesianSolver')
const LeadingAreaDeclassifier = require('../solver/LeadingAreaDeclassifier')
const MultiStreetSolver = require('../solver/MultiStreetSolver')
const InvalidSolutionFilter = require('../solver/InvalidSolutionFilter')
const TokenDistanceFilter = require('../solver/TokenDistanceFilter')
const MustNotPreceedFilter = require('../solver/MustNotPreceedFilter')
const MustNotFollowFilter = require('../solver/MustNotFollowFilter')
const SubsetFilter = require('../solver/SubsetFilter')
const HouseNumberPositionPenalty = require('../solver/HouseNumberPositionPenalty')

class AddressParser extends Parser {
  constructor (options) {
    super(
      // classifiers
      [
        // generic word classifiers
        new AlphaNumericClassifier(),
        new TokenPositionClassifier(),

        // word classifiers
        new HouseNumberClassifier(),
        new PostcodeClassifier(),
        new StreetPrefixClassifier(),
        new StreetSuffixClassifier(),
        new RoadTypeClassifier(),
        new ToponymClassifier(),
        new CompoundStreetClassifier(),
        new DirectionalClassifier(),
        new OrdinalClassifier(),
        new StopWordClassifier(),

        // phrase classifiers
        new IntersectionClassifier(),
        new PersonClassifier(),
        new GivenNameClassifier(),
        new SurnameClassifier(),
        new PersonalSuffixClassifier(),
        new PersonalTitleClassifier(),
        new ChainClassifier(),
        new PlaceClassifier(),
        new WhosOnFirstClassifier(),

        // composite classifiers
        new CompositeClassifier(require('../classifier/scheme/person')),
        new CompositeClassifier(require('../classifier/scheme/street_name')),
        new CompositeClassifier(require('../classifier/scheme/street')),
        new CompositeClassifier(require('../classifier/scheme/place')),
        new CompositeClassifier(require('../classifier/scheme/intersection'))
      ],
      // solvers
      [
        new ExclusiveCartesianSolver(),
        new LeadingAreaDeclassifier(),
        new MultiStreetSolver(),
        new SubsetFilter(),
        new InvalidSolutionFilter([
          ['HouseNumberClassification', 'LocalityClassification'],
          ['HouseNumberClassification', 'LocalityClassification', 'RegionClassification'],
          ['HouseNumberClassification', 'LocalityClassification', 'CountryClassification'],
          ['HouseNumberClassification', 'LocalityClassification', 'RegionClassification', 'CountryClassification'],
          ['HouseNumberClassification', 'RegionClassification'],
          ['HouseNumberClassification', 'RegionClassification', 'CountryClassification'],
          ['HouseNumberClassification', 'CountryClassification'],
          ['HouseNumberClassification', 'PostcodeClassification'],
          ['HouseNumberClassification', 'PostcodeClassification', 'LocalityClassification'],
          ['HouseNumberClassification', 'PostcodeClassification', 'RegionClassification'],
          ['HouseNumberClassification', 'PostcodeClassification', 'CountryClassification'],
          ['PlaceClassification', 'HouseNumberClassification'],
          ['PlaceClassification', 'PostcodeClassification']
        ]),
        new MustNotFollowFilter('PlaceClassification', 'HouseNumberClassification'),
        new MustNotFollowFilter('PlaceClassification', 'StreetClassification'),
        new MustNotFollowFilter('PlaceClassification', 'LocalityClassification'),
        new MustNotFollowFilter('PlaceClassification', 'RegionClassification'),
        new MustNotFollowFilter('PlaceClassification', 'CountryClassification'),
        new MustNotFollowFilter('PlaceClassification', 'PostcodeClassification'),
        new MustNotPreceedFilter('PostcodeClassification', 'HouseNumberClassification'),
        new MustNotPreceedFilter('PostcodeClassification', 'StreetClassification'),
        new MustNotPreceedFilter('LocalityClassification', 'HouseNumberClassification'),
        new MustNotPreceedFilter('LocalityClassification', 'StreetClassification'),
        new MustNotPreceedFilter('RegionClassification', 'HouseNumberClassification'),
        new MustNotPreceedFilter('RegionClassification', 'StreetClassification'),
        new MustNotPreceedFilter('CountryClassification', 'RegionClassification'),
        new MustNotPreceedFilter('CountryClassification', 'LocalityClassification'),
        new MustNotPreceedFilter('CountryClassification', 'PostcodeClassification'),
        new MustNotPreceedFilter('CountryClassification', 'StreetClassification'),
        new MustNotPreceedFilter('CountryClassification', 'HouseNumberClassification'),
        new MustNotFollowFilter('LocalityClassification', 'RegionClassification'),
        new MustNotFollowFilter('LocalityClassification', 'CountryClassification'),
        new HouseNumberPositionPenalty(),
        new TokenDistanceFilter(),
        new SubsetFilter()
      ],
      options
    )
  }
}

module.exports = AddressParser
