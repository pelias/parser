class Classification {
  constructor(span, type, confidence, meta) {
    this.span = span
    this.type = type
    this.confidence = confidence
    this.meta = meta || {}
  }

  static get HOUSENUMBER   (){ return 'HOUSENUMBER' }
  static get STREET        (){ return 'STREET' }
  static get STREET_SUFFIX (){ return 'STREET:SUFFIX' }
  static get POSTCODE      (){ return 'POSTCODE' }
  static get DIRECTIONAL   (){ return 'DIRECTIONAL' }
  static get ORDINAL       (){ return 'ORDINAL' }
}

module.exports = Classification