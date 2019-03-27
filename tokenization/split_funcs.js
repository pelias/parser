/**
  split the input text in to 'sections' according to field delimiter rules

  eg:
    foo-bar baz, bing-bong bop baz
   |------||---||--------||--||---| tokens
   |===========|==================| sections
**/

function fieldsFuncBoundary(char) {
  switch(char) {
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
const whitespace = new RegExp(/^\s$/);
function fieldsFuncWhiteSpace(char) {
  return whitespace.test(char);
}

module.exports.fieldsFuncBoundary = fieldsFuncBoundary;
module.exports.fieldsFuncWhiteSpace = fieldsFuncWhiteSpace;