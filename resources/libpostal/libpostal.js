const fs = require('fs')
const path = require('path')
const dictPath = path.join(__dirname, `./dictionaries`)
const allLanguages = fs.readdirSync( dictPath ).filter( p => !p.includes('.') )

function load( index, langs, filename ){
  langs.forEach(lang => {
    let filepath = path.join(dictPath, lang, filename)
    if( !fs.existsSync(filepath) ) { return }
    let dict = fs.readFileSync( filepath, 'utf8' )
    dict.split('\n').forEach(row => {
      row.split('|').forEach(cell => {
        index[cell.trim()] = true
      })
    }, this)
  }, this)
}

module.exports.load = load
module.exports.languages = allLanguages