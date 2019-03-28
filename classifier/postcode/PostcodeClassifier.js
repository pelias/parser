const Classifier = require('../../classification/Classifier')
const Classification = require('../../classification/Classification')

// postcode data sourced from google-i18n project
// see: https://chromium-i18n.appspot.com/ssl-address

const whitelist = [ 'US', 'GB', 'AU', 'NZ', 'DE' ]

class PostcodeClassifier extends Classifier {

  constructor(){
    super()
    this.loadSSLAddressData()
  }

  loadSSLAddressData() {
    this.data = whitelist.map( cc => {
      let row = require(`../../resources/chromium-i18n/ssl-address/${cc}.json`)
      row.regex = new RegExp( row.zip );
      return row
    })
  }
  
  each(span) {
    for( let i=0; i<this.data.length; i++ ){
      let row = this.data[i]
      if( row.regex.test(span.body) ){
        this.results.push( new Classification(span, 'POSTCODE', 1, row) )
        break
      }
    }
  }
}

module.exports = PostcodeClassifier