var fs = require('fs');
var partFile = require('../index');
var assert = require('assert');

var waiting = 3;
var timeout;

var unlink = function() {
	try {
		fs.unlinkSync('test');
	} catch (err) {}
};

unlink();
fs.writeFileSync('test', Array(50).join(' '));

var file = partFile('test', 11, [
	'2aae6c35c94fcfb415dbe95f408b9ce91ee846ed',
	'2aae6c35c94fcfb415dbe95f408b9ce91ee846ed',
	'2aae6c35c94fcfb415dbe95f408b9ce91ee846ed'
]);

file.on('readable', function(i) {
	file.read(i, function(err, buf) {
		assert.equal(buf.toString(), 'hello world');
		if (--waiting) return;
		clearTimeout(timeout);
		unlink();
	});
});

file.write(0, new Buffer('hello world'));
file.write(1, new Buffer('hello world'));
file.write(2, new Buffer('hello world'));

timeout = setTimeout(function() {
	assert.ok(false);
}, 1000);