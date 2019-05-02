const PhraseClassifier = require('./super/PhraseClassifier')
const AreaClassification = require('../classification/AreaClassification')
// const CountryClassification = require('../classification/CountryClassification')
// const DependencyClassification = require('../classification/DependencyClassification')
const RegionClassification = require('../classification/RegionClassification')
const LocalityClassification = require('../classification/LocalityClassification')
const whosonfirst = require('../resources/whosonfirst/whosonfirst')

// databases sourced from the WhosOnFirst project
// see: https://whosonfirst.org

const placetypes = {
  // 'country': {
  //   files: ['wof:country.txt', 'wof:shortcode.txt', 'name:eng_x_preferred.txt'],
  //   classifications: [AreaClassification, CountryClassification]
  // },
  // 'dependency': {
  //   files: ['wof:shortcode.txt', 'name:eng_x_preferred.txt'],
  //   classifications: [AreaClassification, DependencyClassification]
  // },
  'region': {
    files: ['abrv:eng_x_preferred.txt', 'name:eng_x_preferred.txt'],
    classifications: [AreaClassification, RegionClassification]
  },
  'locality': {
    files: ['name:eng_x_preferred.txt'],
    classifications: [AreaClassification, LocalityClassification]
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

      // blacklist
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

    Object.keys(placetypes).forEach(placetype => {
      if (this.tokens[placetype].has(span.norm)) {
        placetypes[placetype].classifications.forEach(Class => span.classify(new Class(1.0)))
      }
    })
  }
}

module.exports = WhosOnFirstClassifier
