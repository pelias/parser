/**
  split the input text in to 'sections' according to field delimiter rules

  eg:
    foo-bar baz, bing-bong bop baz
   |------||---||--------||--||---| tokens
   |===========|==================| sections
**/
const whitespace = new RegExp(/^\s$/)
const quotes = `"«»‘’‚‛“”„‟‹›⹂「」『』〝〞〟﹁﹂﹃﹄＂＇｢｣`

function fieldsFuncBoundary (char) {
  switch (char) {
    case '\n':
      return true
    case '\t':
      return true
    case ',':
      return true
    default:
      // @todo: this should ideally only work for 'matching pairs' of quotes
      if (quotes.includes(char)) { return true }

      return false
  }
}

// test for any unicode whitespace char including newlines and tabs
// @todo: is this possible in js without using a regex?
function fieldsFuncWhiteSpace (char) {
  return whitespace.test(char)
}

function fieldsFuncHyphenOrWhiteSpace (char) {
  return char === '-' || char === '/' || fieldsFuncWhiteSpace(char)
}

module.exports.fieldsFuncBoundary = fieldsFuncBoundary
module.exports.fieldsFuncWhiteSpace = fieldsFuncWhiteSpace
module.exports.fieldsFuncHyphenOrWhiteSpace = fieldsFuncHyphenOrWhiteSpace
