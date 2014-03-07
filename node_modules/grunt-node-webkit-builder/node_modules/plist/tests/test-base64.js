/**
 * tests for base64 encoding and decoding, used in <data> elements
 */

var path = require('path')
  , plist = require('../');

exports.testDecodeBase64 = function(test) {
  var file = path.join(__dirname, 'utf8data.xml');
  var p = plist.parseFileSync(file);
  test.equal(p['Smart Info'], '✓ à la mode');
  test.done();
}

exports.testDecodeBase64WithNewlines = function(test) {
  var file = path.join(__dirname, 'utf8data.xml');
  var p = plist.parseFileSync(file);
  test.equal(p['Newlines'], '✓ à la mode');
  test.done();
}

exports.testBase64Encode = function(test) {
  var to_write = { yay: '✓ à la mode' };
  var out = plist.build(to_write);
  var p = plist.parseStringSync(out);
  test.equal(p['yay'], '✓ à la mode');
  test.done();
}
