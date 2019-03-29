const WordClassifier = require('../../classification/WordClassifier')
const Classification = require('../../classification/Classification')

// postcode data sourced from google-i18n project
// see: https://chromium-i18n.appspot.com/ssl-address
const whitelist = [ 'US', 'GB', 'AU', 'NZ', 'DE' ]

class PostcodeClassifier extends WordClassifier {

  constructor(){
    super()
    this.loadSSLAddressData()
  }

  loadSSLAddressData() {
    this.data = whitelist.map( cc => {
      let row = require(`../../resources/chromium-i18n/ssl-address/${cc}.json`)
      row.regex = new RegExp( '^(' + row.zip + ')$', 'i' );
      return row
    })
  }
  
  each(span) {
    for( let i=0; i<this.data.length; i++ ){
      let row = this.data[i]
      if( row.regex.test(span.body) ){
        this.add( new Classification(span, 'POSTCODE', 1) )
        break
      }
    }
  }
}

module.exports = PostcodeClassifier