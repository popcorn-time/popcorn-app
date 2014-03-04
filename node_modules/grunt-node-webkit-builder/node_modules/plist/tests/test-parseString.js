var plist = require('../');

exports.testString = function(test) {
  plist.parseString('<string>Hello World!</string>', function(err, res) {
    test.ifError(err);
    test.equal(res, 'Hello World!');
    test.done();
  });
}

exports.testParseStringSync = function(test) {
  test.doesNotThrow(function(){
    var res = plist.parseStringSync('<plist><dict><key>test</key><integer>101</integer></dict></plist>');
    test.equal(Object.keys(res)[0], 'test');
    test.equal(res.test, 101);
    test.done();
  });
}

exports.testParseStringSyncFailsOnInvalidXML = function(test) {
  test.throws(function(){
    var res = plist.parseStringSync('<string>Hello World!</string>');
  });
  test.done();
}

exports.testDict = function(test) {
  plist.parseString('<plist><dict><key>test</key><integer>101</integer></dict></plist>', function(err, res) {
    test.ifError(err);
  
    test.ok(Array.isArray(res));
    test.equal(res.length, 1);
    test.equal(Object.keys(res[0])[0], 'test');
    test.equal(res[0].test, 101);
    test.done();
  });
}

exports.testCDATA = function(test) {
  plist.parseString('<string><![CDATA[Hello World!&lt;M]]></string>', function(err, res) {
    test.ifError(err);
    test.equal(res, 'Hello World!&lt;M');
    test.done();
  });
}
