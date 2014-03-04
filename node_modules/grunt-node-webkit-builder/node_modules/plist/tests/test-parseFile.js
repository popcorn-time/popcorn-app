var path = require('path')
  , plist = require('../');

exports.testParseFileSmallItunesXML = function(test) {
  var file = path.join(__dirname, 'iTunes-small.xml');
  plist.parseFile(file, function(err, dicts) {
    var dict = dicts[0];

    test.ifError(err);
    test.equal(dict['Application Version'], '9.0.3');
    test.equal(dict['Library Persistent ID'], '6F81D37F95101437');

    test.done();
  });
}

exports.testParseFile = function(test) {
  var file = path.join(__dirname, 'sample2.plist');

  plist.parseFile(file, function(err, dicts) {
    var dict = dicts[0];
    test.ifError(err);

    test.equal(dict['PopupMenu'][2]['Key'], "\n        \n        #import &lt;Cocoa/Cocoa.h&gt;\n\n#import &lt;MacRuby/MacRuby.h&gt;\n\nint main(int argc, char *argv[])\n{\n  return macruby_main(\"rb_main.rb\", argc, argv);\n}\n\n");
  
    test.done();
  });
}

exports.testParseFileSync = function(test) {
  var file = path.join(__dirname, 'sample2.plist');
  test.doesNotThrow(function(){
    var dict = plist.parseFileSync(file);
    test.equal(dict['PopupMenu'][2]['Key'], "\n        \n        #import &lt;Cocoa/Cocoa.h&gt;\n\n#import &lt;MacRuby/MacRuby.h&gt;\n\nint main(int argc, char *argv[])\n{\n  return macruby_main(\"rb_main.rb\", argc, argv);\n}\n\n");
  });
  test.done();
}

exports.testParseFileAirplayXML = function(test) {
  var file = path.join(__dirname, 'airplay.xml');

  plist.parseFile(file, function(err, dicts) {
    var dict;
    test.ifError(err);
    dict = dicts[0];
    
    test.equal(dict['duration'], 5555.0495000000001);
    test.equal(dict['position'], 4.6269989039999997);

    test.done();
  });
}
