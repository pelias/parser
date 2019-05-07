const PhraseClassifier = require('./super/PhraseClassifier')
const AreaClassification = require('../classification/AreaClassification')
const CountryClassification = require('../classification/CountryClassification')
// const DependencyClassification = require('../classification/DependencyClassification')
const RegionClassification = require('../classification/RegionClassification')
const LocalityClassification = require('../classification/LocalityClassification')
const whosonfirst = require('../resources/whosonfirst/whosonfirst')

// databases sourced from the WhosOnFirst project
// see: https://whosonfirst.org

// note: these should be defined from most granular to least granular
const placetypes = {
  'locality': {
    files: ['name:eng_x_preferred.txt'],
    classifications: [AreaClassification, LocalityClassification]
  },
  'region': {
    files: ['abrv:eng_x_preferred.txt', 'name:eng_x_preferred.txt'],
    classifications: [AreaClassification, RegionClassification]
  },
  // 'dependency': {
  //   files: ['wof:shortcode.txt', 'name:eng_x_preferred.txt'],
  //   classifications: [AreaClassification, DependencyClassification]
  // },
  'country': {
    files: ['name:eng_x_preferred.txt'],
    classifications: [AreaClassification, CountryClassification]
  }
}

class WhosOnFirstClassifier extends PhraseClassifier {
  setup () {
    this.tokens = {}
    Object.keys(placetypes).forEach(placetype => {
      this.tokens[placetype] = new Set()
      placetypes[placetype].files.forEach(file => {
        whosonfirst.load(this.tokens[placetype], [placetype], file)
      })

      // general blacklist
      this.tokens[placetype].delete('north')
      this.tokens[placetype].delete('south')
      this.tokens[placetype].delete('east')
      this.tokens[placetype].delete('west')
      this.tokens[placetype].delete('street')
      this.tokens[placetype].delete('city')
      this.tokens[placetype].delete('king')
      this.tokens[placetype].delete('at')
      this.tokens[placetype].delete('rue')
      this.tokens[placetype].delete('one')
      this.tokens[placetype].delete('two')
      this.tokens[placetype].delete('three')
      this.tokens[placetype].delete('four')
      this.tokens[placetype].delete('five')
      this.tokens[placetype].delete('six')
      this.tokens[placetype].delete('seven')
      this.tokens[placetype].delete('eight')
      this.tokens[placetype].delete('nine')
      this.tokens[placetype].delete('ten')
      this.tokens[placetype].delete('cafe')
      this.tokens[placetype].delete('small')
      this.tokens[placetype].delete('town')
      this.tokens[placetype].delete('city')
      this.tokens[placetype].delete('grand')

      // placetype specific modifications
      if (placetype === 'locality') {
        // these are the only two decent values in
        // file: locality/abrv:eng_x_preferred.txt
        this.tokens.locality.add('nyc')
        this.tokens.locality.add('sf')

        // remove problematic locality names
        this.tokens.locality.delete('texas')
        this.tokens.locality.delete('california')
        this.tokens.locality.delete('italy')

        // remove locality names that sound like streets
        let remove = ['avenue', 'lane', 'terrace', 'street', 'road', 'crescent']
        this.tokens.locality.forEach(token => {
          let split = token.split(/\s/)
          let lastWord = split[split.length - 1]
          if (remove.includes(lastWord)) {
            this.tokens.locality.delete(token)
          }
        })
      }
    })
  }

  each (span) {
    // do not classify tokens preceeded by an 'IntersectionClassification' or 'StopWordClassification'
    let firstChild = span.graph.findOne('child:first') || span
    let prev = firstChild.graph.findOne('prev')
    if (
      prev && (
        prev.classifications.hasOwnProperty('IntersectionClassification') ||
        prev.classifications.hasOwnProperty('StopWordClassification')
      )) {
      return
    }

    // do not classify tokens preceeding 'StreetSuffixClassification'
    let lastChild = span.graph.findOne('child:last') || span
    let next = lastChild.graph.findOne('next')
    if (
      next && (
        next.classifications.hasOwnProperty('StreetSuffixClassification')
      )) {
      return
    }

    Object.keys(placetypes).forEach(placetype => {
      if (this.tokens[placetype].has(span.norm)) {
        placetypes[placetype].classifications.forEach(Class => span.classify(new Class(1.0)))
      }
    })
  }
}

module.exports = WhosOnFirstClassifier
