var CustomType = module.exports = function(raw) {
  this.raw = raw
}

CustomType.prototype.serialize = function(xml) {
  return xml.ele(this.tagName).txt(this.raw)
}

CustomType.prototype.tagName = 'customType'

