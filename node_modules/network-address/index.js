var os = require('os');

module.exports = function() {
	var interfaces = os.networkInterfaces();
	for (var i in interfaces) {
		for (var j = 0; j < interfaces[i].length; j++) {
			var face = interfaces[i][j];
			if (!face.internal && face.family === 'IPv4') return face.address;
		}
	}
	return '127.0.0.1';
};