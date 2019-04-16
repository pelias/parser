/**
  split the input text in to 'sections' according to field delimiter rules

  eg:
    foo-bar baz, bing-bong bop baz
   |------||---||--------||--||---| tokens
   |===========|==================| sections
**/
const whitespace = new RegExp(/^\s$/)

function fieldsFuncBoundary (char) {
  switch (char) {
    case '\n':
      return true
    case '\t':
      return true
    case ',':
      return true
      // @todo: this should ideally only work for 'matching pairs' of quotes
    case '"':
      return true
    default:
      return false
  }
}

// test for any unicode whitespace char including newlines and tabs
// @todo: is this possible in js without using a regex?
function fieldsFuncWhiteSpace (char) {
  return whitespace.test(char)
}

module.exports.fieldsFuncBoundary = fieldsFuncBoundary
module.exports.fieldsFuncWhiteSpace = fieldsFuncWhiteSpace
