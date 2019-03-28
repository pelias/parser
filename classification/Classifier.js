class Classifier {
  constructor() {
    this.results = []
  }

  // classify an individual Span
  // note: you should provide this function in your subclass
  // each(span) {}

  // run classifier against every permutation produced by the tokenizer
  classify(tokenizer){
    for( let i=0; i<tokenizer.section.length; i++ ){
      for( let j=0; j<tokenizer.section[i].permutation.length; j++ ){
        this.each( tokenizer.section[i].permutation[j] )
      }
    }
  }
}

module.exports = Classifier