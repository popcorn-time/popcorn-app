var fs = require('fs');

var archiver = require('archiver');

var output = fs.createWriteStream(__dirname + '/bulk-output.zip');
var archive = archiver('zip');

output.on('close', function() {
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

archive.bulk([
  { expand: true, cwd: 'fixtures/', src: ['*.txt'] }
]);

archive.finalize(function(err, bytes) {
  if (err) {
    throw err;
  }

  console.log(bytes + ' total bytes');
});