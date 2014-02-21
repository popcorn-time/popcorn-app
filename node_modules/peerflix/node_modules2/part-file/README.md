# part-file

Read and write parts to a file with random access support

	npm install part-file

# usage

``` js
var partFile = require('part-file');

var file = partFile('my-file.txt', 1024, [ // 1024 is the part size
	'sha1 hex of first part',
	'sha1 hex of second part'
]);

file.on('readable', function(partNumber) {
	// when a part becomes readable this event will be called
});

file.write(partNumber, buffer, function(err) {
	// if the hash doesnt match there will be an error
});

file.read(partNumber, function(err, buffer) {
	// if part hasnt been written there will be an error
});
```
