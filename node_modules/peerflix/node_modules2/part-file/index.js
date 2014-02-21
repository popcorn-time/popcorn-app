var fs = require('fs');
var crypto = require('crypto');
var thunky = require('thunky');
var events = require('events');

var noop = function() {};
var sha1 = function(data) {
	return crypto.createHash('sha1').update(data).digest('hex');
};

var PartFile = function(filename, partSize, parts) {
	if (!(this instanceof PartFile)) return new PartFile(filename, partSize, parts);

	events.EventEmitter.call(this);

	this.filename = filename;
	this.parts = parts;
	this.partSize = partSize;
	this.verified = [];
	this.verifiedParts = 0;

	this.open = thunky(function(callback) {
		fs.exists(filename, function(exists) {
			fs.open(filename, exists ? 'r+' : 'w+', callback);
		});
	});
};

PartFile.prototype.__proto__ = events.EventEmitter.prototype;

PartFile.prototype.readable = function(index) {
	return !!this.verified[index];
};

PartFile.prototype.complete = function() {
	return this.verifiedParts === this.parts.length;
};

PartFile.prototype.verify = function(index, callback) {
	if (!callback) callback = noop;
	var self = this;
	if (this.verified[index]) return callback(null, true);
	this._read(index, function(err, buf) {
		if (err) return callback(err);
		if (sha1(buf) !== self.parts[index]) return callback(null, false);
		self._verified(index);
		callback(null, true);
	});
};

PartFile.prototype.read = function(index, callback) {
	if (!this.verified[index]) return callback(new Error('part is not written'));
	this._read(index, callback);
};

PartFile.prototype.write = function(index, buf, callback) {
	if (typeof buf === 'string') buf = new Buffer(buf);
	if (!callback) callback = noop;

	var self = this;
	this.open(function(err, fd) {
		if (err) return callback(err);
		if (sha1(buf) !== self.parts[index]) return callback(new Error('part is invalid'));
		fs.write(fd, buf, 0, buf.length, index * self.partSize, function(err) {
			if (!err) self._verified(index);
			callback(err);
		});
	});
};

PartFile.prototype.close = function(callback) {
	if (!callback) callback = noop;
	this.open(function(err, fd) {
		if (err) return callback(err);
		fs.close(fd, callback);
	});
};

PartFile.prototype._read = function(index, callback) {
	var self = this;
	var partSize = this.partSize;
	this.open(function(err, fd) {
		if (err) return callback(err);
		fs.read(fd, new Buffer(partSize), 0, partSize, index * partSize, function(err, bytesRead, buf) {
			if (err) return callback(err);
			if (!bytesRead) return callback(new Error('could not read any bytes'));
			callback(null, buf.slice(0, bytesRead));
		});
	});
};

PartFile.prototype._verified = function(index) {
	if (this.verified[index]) return;
	this.verified[index] = true;
	this.verifiedParts++;
	this.emit('readable', index);
	if (this.complete()) this.emit('complete');
};

module.exports = PartFile;