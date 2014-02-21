var util = require('util');

var ANSI = {};

ANSI.bold      = ['\x1B[1m',  '\x1B[22m'];
ANSI.italic    = ['\x1B[3m',  '\x1B[23m'];
ANSI.underline = ['\x1B[4m',  '\x1B[24m'],
ANSI.inverse   = ['\x1B[7m',  '\x1B[27m'],
ANSI.white     = ['\x1B[37m', '\x1B[39m'],
ANSI.grey      = ['\x1B[90m', '\x1B[39m'],
ANSI.black     = ['\x1B[30m', '\x1B[39m'],
ANSI.blue      = ['\x1B[34m', '\x1B[39m'],
ANSI.cyan      = ['\x1B[36m', '\x1B[39m'],
ANSI.green     = ['\x1B[32m', '\x1B[39m'],
ANSI.magenta   = ['\x1B[35m', '\x1B[39m'],
ANSI.red       = ['\x1B[31m', '\x1B[39m'],
ANSI.yellow    = ['\x1B[33m', '\x1B[39m']

var WHITESPACE = Array(1000).join(' ');

var SYNTAX = /\{([^:\}]+)(?::([^\{\}]*))?\}/g;
var SYNTAX_REPLACE = function(value, head) {
	if (alias[head]) {
		return alias[head].reduce(SYNTAX_REPLACE, value);
	}
	var num = parseInt(head,10);
	if (num) return value+WHITESPACE.slice(0, Math.max(num-value.length,0));
	if (!ANSI[head]) return value;
	return ANSI[head][0]+value+ANSI[head][1];
};
var SYNTAX_REPLACE_ALL = function(_, heads, value) {
	return heads.split('+').reduce(SYNTAX_REPLACE, value || '');
};

var offset = 0;
var offsetPin = 0;
var lastClear = 0;
var shouldFlush = true;
var shouldResetCursor = false;
var canvasStream;

var linesCache = [];
var alias = {};

exports.__defineGetter__('width', function() {
	return canvasStream.columns;
});
exports.__defineGetter__('height', function() {
	return canvasStream.rows;
});
exports.alias = function(name, value) {
	linesCache = [];
	if (typeof name === 'object') {
		Object.keys(name).forEach(function(key) {
			exports.alias(key, name[key]);
		});
		return;
	}
	alias[name] = typeof value === 'string' ? value.split('+') : [value];
};
exports.use = function(stream) {
	return canvasStream = stream;
};
exports.flush = function(bool) {
	shouldFlush = bool;
	if (shouldFlush !== false && canvasStream.clearScreenDown) {
		canvasStream.clearScreenDown();	
	}
};
exports.cursor = function(bool) {
	if (bool === false) {
		shouldResetCursor = true;
		canvasStream.write('\x1B[?25l');
	} else {
		canvasStream.write('\x1B[?25h');
	}
};
exports.clear = function(wait) {
	if (Date.now() - lastClear < wait) {
		return false;
	}
	lastClear = Date.now();
	if (canvasStream.moveCursor) {
		canvasStream.moveCursor(0, -offset);	
	}
	if (shouldFlush && canvasStream.clearScreenDown) {
		canvasStream.clearScreenDown();	
	}
	offset = offsetPin;
	return true;
};
exports.write = function(line) {
	if (!Buffer.isBuffer(line)) {
		line = util.format.apply(util, arguments);
		line = line.replace(SYNTAX, SYNTAX_REPLACE_ALL).replace(SYNTAX, SYNTAX_REPLACE_ALL);
	}
	canvasStream.write(line);
	return line;
};
exports.line = function(line) {
	offset++;
	line += '\n';

	if (arguments.length === 1 && linesCache[offset] && linesCache[offset][0] === line) {
		canvasStream.write(linesCache[offset][1]);
		return linesCache[offset][1];
	}
	if (arguments.length === 1) {
		linesCache[offset] = [line, exports.write(line)];
		return linesCache[offset][1];
	}

	return exports.write.apply(exports, arguments);
};
exports.pin = function(pos) {
	if (pos === true || pos === undefined) return exports.pin(offset);
	if (pos === false) return exports.pin(0);
	offsetPin = pos;
};
exports.times = function(str, num) {
	if (typeof num === 'string') {
		var tmp = num;
		num = str;
		str = tmp;
	}
	return Array(num+1).join(str);
}
exports.use(process.stdout);

process.on('exit', function() {
	if (!shouldResetCursor) return;
	exports.cursor(true);
});