var path = require('path')
  , plist = require('../')
  , file = path.join(__dirname, 'iTunes-BIG.xml')
  , startTime = new Date();

exports.textBigXML = function(test) {
  plist.parseFile(file, function(err, dicts) {
    var dict = dicts[0];

    test.ifError(err);

    test.equal(dicts.length, 1);
    test.equal(dict['Application Version'], '9.2.1');
    test.deepEqual(Object.keys(dict), [
        'Major Version'
      , 'Minor Version'
      , 'Application Version'
      , 'Features'
      , 'Show Content Ratings'
      , 'Music Folder'
      , 'Library Persistent ID'
      , 'Tracks'
      , 'Playlists'
    ]);

    test.done();
  });
}
