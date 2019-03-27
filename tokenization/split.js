function split(span, f) {

  // A span is used to record a slice of s of the form s[start:end].
  // The start index is inclusive and the end index is exclusive.
  let spans = []

  // Find the field start and end indices.
  let wasField = false
  let fromIndex = 0
  
  // Iterate unicode code points in string
  for( var i=0; i<span.body.length; i++){
    let char = span.body.charAt(i);
    if( f(char) ) {
      if( wasField ) {
        spans.push({
          body: span.body.substring(fromIndex, i),
          start: span.start + fromIndex,
          end: span.start + i
        })
        wasField = false
      }
    } else if( !wasField ) {
      fromIndex = i
      wasField = true
    }
  }

  // Last field might end at EOF.
  if( wasField ){
    spans.push({
      body: span.body.substring(fromIndex, span.body.length),
      start: span.start + fromIndex,
      end: span.start + span.body.length
    });
  }

  return spans
}

module.exports = split