var path = require('path')
  , fs = require('fs')
  , plist = require('../');
 
/*
// TODO These assertions fail because CDATA entities get converted in the process
exports.testBuildFromPlistFile = function(test) {
  var file = path.join(__dirname, 'sample2.plist');

  plist.parseFile(file, function(err, dicts) {
    var dict = dicts[0];
    test.ifError(err);

    // Try re-stringifying and re-parsing
    plist.parseString(plist.build(dict), function(err, dicts2) {
      test.ifError(err);
      test.deepEqual(dicts,dicts2);
      test.done();
    });
  });
}
*/


exports.testNonBase64StringsAsData = function(test) {
  var test_object = { 'a': 'test stringy thingy', 'b': 'this contains non base64 ✔ ' };

  var result = plist.build(test_object);
  var DOMParser = require('xmldom').DOMParser;
  var doc = new DOMParser().parseFromString(result);

  test.equal('a', doc.documentElement.childNodes[1].childNodes[1].childNodes[0].nodeValue);
  test.equal('string',              doc.documentElement.childNodes[1].childNodes[3].nodeName);
  test.equal('test stringy thingy', doc.documentElement.childNodes[1].childNodes[3].childNodes[0].nodeValue);

  test.equal('b', doc.documentElement.childNodes[1].childNodes[5].childNodes[0].nodeValue);
  test.equal ('string', doc.documentElement.childNodes[1].childNodes[7].nodeName);
  test.equal ('this contains non base64 ✔ ', doc.documentElement.childNodes[1].childNodes[7].childNodes[0].nodeValue);

  test.done();
}



exports.testBuildFromObjectWithFunctions = function(test) {
  var test_object = { 'a': 'test stringy thingy', 'b': function(c, d){ return 'neat'; } };

  // Try stringifying
  plist.parseString(plist.build(test_object), function(err, dicts) {
    test.equal(dicts[0].b, undefined);
    test.equal(dicts[0].a, 'test stringy thingy');
    test.done();
  });
}


exports.testBuildFromSmallItunesXML = function(test) {
  var file = path.join(__dirname, 'iTunes-small.xml');
  plist.parseFile(file, function(err, dicts) {
    var dict = dicts[0];

    test.ifError(err);

    // Try re-stringifying and re-parsing
    plist.parseString(plist.build(dict), function(err, dicts2) {
      test.ifError(err);
      test.deepEqual(dicts,dicts2);
      test.done();
    });
  });
}

exports.testBuildAirplayXML = function(test) {
  var file = path.join(__dirname, 'airplay.xml');

  plist.parseFile(file, function(err, dicts) {
    var dict = dicts[0];
    test.ifError(err);
    
    // Try re-stringifying and re-parsing
    plist.parseString(plist.build(dict), function(err, dicts2) {
      test.ifError(err);
      test.deepEqual(dicts,dicts2);
      test.done();
    });
  });
}

exports.testCordovaPlist = function(test) {
  var file = path.join(__dirname, 'Cordova.plist');

  plist.parseFile(file, function(err, dicts) {
    var dict = dicts[0];
    test.ifError(err);
    test.equal(dict['TopActivityIndicator'], 'gray');
    test.equal(dict['Plugins']['Device'], 'CDVDevice');

    // Try re-stringifying and re-parsing
    plist.parseString(plist.build(dict), function(err, dicts2) {
      test.ifError(err);
      test.deepEqual(dicts,dicts2);
      test.done();
    });
  });
}

exports.testBuildPhoneGapPlist = function(test) {
  var file = path.join(__dirname, 'Xcode-PhoneGap.plist');

  plist.parseFile(file, function(err, dicts) {
    var dict = dicts[0];
    test.ifError(err);
  
    test.equal(dict['ExternalHosts'][0], "*");
    test.equal(dict['Plugins']['com.phonegap.accelerometer'], "PGAccelerometer");

    //console.log('like they were', dict);
    //console.log('hmm', plist.build(dict));
    // Try re-stringifying and re-parsing
    plist.parseString(plist.build(dict), function(err, dicts2) {
      test.ifError(err);
      test.deepEqual(dicts,dicts2);
      test.done();
    });
  });
}

exports.testBuildXcodeInfoPlist = function(test) {
  var file = path.join(__dirname, 'Xcode-Info.plist');

  plist.parseFile(file, function(err, dicts) {
    var dict = dicts[0];
    test.ifError(err);
    
    test.equal(dict['CFBundleAllowMixedLocalizations'], true);
    test.equal(dict['CFBundleExecutable'], "${EXECUTABLE_NAME}");
    test.equal(dict['UISupportedInterfaceOrientations~ipad'][0], "UIInterfaceOrientationPortrait");

    // Try re-stringifying and re-parsing
    plist.parseString(plist.build(dict), function(err, dicts2) {
      test.ifError(err);
      test.deepEqual(dicts,dicts2);
      test.done();
    });
  });
}


// this code does a string to string comparison. It's not very useful right 
// now because CDATA sections arent supported. save for later I guess
/*
function flattenXMLForAssert(instr) {
    return instr.replace(/\s/g,'');
}

// Builder test B - build plist from JS object, then compare flattened XML against original plist *file* content 
function testBuildAgainstFile(test, dict, infile) {
    var doc = plist.build(dict)
      , fileContent = fs.readFileSync(infile)
      , s1 = flattenXMLForAssert(doc.toString())
      , s2 = flattenXMLForAssert(fileContent.toString())
      , mismatch = '';

    for (var i=0;i<s1.length; i++) {
        if (s1[i]!==s2[i]) {
            mismatch = '" at char '+ i;
            break;
        }
    }
    test.equal(s1, s2, 'file mismatch in "' + infile + mismatch);
}*/
