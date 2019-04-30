// enforce that 'area' tokens (admin places) must come after
// less granular components such as street or housenumber
// @todo: this is not globally true, but works well in the Western Hemisphere

const NETURAL_CLASSIFICATIONS = [
  'PostcodeClassification'
]

const ADMIN_CLASSIFICATIONS = [
  'LocalityClassification',
  'RegionClassification',
  'CountryClassification'
]

class LeadingAreaDeclassifier {
  solve (tokenizer) {
    tokenizer.solution.forEach(s => {
      // record the position of the last non-admin cursor position
      let lastNonAdminCursorPosition = 0

      for (let i = 0; i < s.pair.length; i++) {
        let isAdmin = ADMIN_CLASSIFICATIONS.some(c => s.pair[i].classification.constructor.name === c)
        let isNeut = NETURAL_CLASSIFICATIONS.some(c => s.pair[i].classification.constructor.name === c)
        if (!isAdmin && !isNeut) {
          lastNonAdminCursorPosition = s.pair[i].span.end
        }
      }

      s.pair = s.pair.filter(p => {
        let isAdmin = ADMIN_CLASSIFICATIONS.some(c => p.classification.constructor.name === c)
        if (isAdmin && p.span.end < lastNonAdminCursorPosition) {
          return false
        }
        return true
      })
    })

    tokenizer.solution.sort((a, b) => b.score - a.score) // sort results by score desc
    tokenizer.solution.forEach(s => s.pair.sort((a, b) => a.span.start - b.span.start)) // sort by span start
  }
}

module.exports = LeadingAreaDeclassifier
