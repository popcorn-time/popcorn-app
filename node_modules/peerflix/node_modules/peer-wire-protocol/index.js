var Duplex = require('stream').Duplex || require('readable-stream').Duplex;
var EventEmitter = require('events').EventEmitter;
var bitfield = require('bitfield');

var MESSAGE_PROTOCOL     = new Buffer('\x13BitTorrent protocol');
var MESSAGE_KEEP_ALIVE   = new Buffer('\x00\x00\x00\x00');
var MESSAGE_CHOKE        = new Buffer('\x00\x00\x00\x01\x00');
var MESSAGE_UNCHOKE      = new Buffer('\x00\x00\x00\x01\x01');
var MESSAGE_INTERESTED   = new Buffer('\x00\x00\x00\x01\x02');
var MESSAGE_UNINTERESTED = new Buffer('\x00\x00\x00\x01\x03');

var ID_CHOKE        = 0;
var ID_UNCHOKE      = 1;
var ID_INTERESTED   = 2;
var ID_UNINTERESTED = 3;
var ID_HAVE         = 4;
var ID_BITFIELD     = 5;
var ID_REQUEST      = 6;
var ID_PIECE        = 7;
var ID_CANCEL       = 8;
var ID_PORT         = 9;

var noop = function() {};

var CallbackStore = function() {
	EventEmitter.call(this);

	this._list = [];
	this._id = null;
	this._ms = 0;
	this._ontimeout = this.emit.bind(this, 'timeout');
	this.on('timeout', this._reset);
};

CallbackStore.prototype.__proto__ = EventEmitter.prototype;

CallbackStore.prototype.setTimeout = function(ms) {
	this._ms = ms;
	this._reset();
};

CallbackStore.prototype.size = function() {
	return this._list.length;
};

CallbackStore.prototype.push = function(i, offset, length, callback) {
	this._list.push(arguments);
	if (this._list.length === 1) this._reset();
};

CallbackStore.prototype.pull = function(i, offset, length) {
	for (var j = 0; j < this._list.length; j++) {
		var req = this._list[j];
		if (req[0] === i && req[1] === offset && req[2] === length) {
			this._list.splice(j, 1);
			this._reset();
			return req.length > 3 && req[3];
		}
	}
};

CallbackStore.prototype.forEach = function(fn) {
	this._list.slice(0).forEach(function(args) {
		fn.apply(null, args);
	});
};

CallbackStore.prototype.clear = function() {
	this._list = [];
	this._reset();
}

CallbackStore.prototype.shift = function() {
	var first = this._list.shift();
	this._reset();
	return first && first.length > 3 && first[3];
};

CallbackStore.prototype._reset = function() {
	if (this._id) clearTimeout(this._id);
	this._id = null;
	if (!this._ms || !this._list.length) return;
	this._id = setTimeout(this._ontimeout, this._ms);
};

var Wire = function() {
	if (!(this instanceof Wire)) return new Wire();
	Duplex.call(this);
	var self = this;

	this.amChoking = true;
	this.amInterested = false;
	this.peerChoking = true;
	this.peerInterested = false;
	this.peerPieces = [];
	this.peerExtensions = {};
	this.peerAddress = null; // for someone else to populate...

	this.uploaded = 0;
	this.downloaded = 0;

	this._requests = new CallbackStore();
	this._peerRequests = new CallbackStore();
	this._keepAlive = null;
	this._finished = false;

	this._requests.on('timeout', function() {
		self.emit('timeout');
		(self._requests.shift() || noop)(new Error('request has timed out'));
	});

	this.on('finish', function() {
		self._finished = true;
		self.push(null); // cannot be half open
		clearInterval(self._keepAlive);
		self._parse(Number.MAX_VALUE, noop);
		while (self._requests.size()) self._requests.shift()(new Error('wire is closed'));
		while (self._peerRequests.size()) self._peerRequests.shift();
	});

	this._buffer = [];
	this._bufferSize = 0;
	this._parser = null;
	this._parserSize = 0;

	var onmessagelength = function(length) {
		length = length.readUInt32BE(0);
		if (length) return self._parse(length, onmessage);
		self._parse(4, onmessagelength);
		self.emit('keep-alive');
	};
	var onmessage = function(buffer) {
		self._parse(4, onmessagelength);
		switch (buffer[0]) {
			case ID_CHOKE:
			return self._onchoke();
			case ID_UNCHOKE:
			return self._onunchoke();
			case ID_INTERESTED:
			return self._oninterested();
			case ID_UNINTERESTED:
			return self._onuninterested();
			case ID_HAVE:
			return self._onhave(buffer.readUInt32BE(1));
			case ID_BITFIELD:
			return self._onbitfield(buffer.slice(1));
			case ID_REQUEST:
			return self._onrequest(buffer.readUInt32BE(1), buffer.readUInt32BE(5), buffer.readUInt32BE(9));
			case ID_PIECE:
			return self._onpiece(buffer.readUInt32BE(1), buffer.readUInt32BE(5), buffer.slice(9));
			case ID_CANCEL:
			return self._oncancel(buffer.readUInt32BE(1), buffer.readUInt32BE(5), buffer.readUInt32BE(9));
			case ID_PORT:
			return self._onport(buffer.readUInt16BE(1));
		}
		self.emit('unknownmessage', buffer);
	};

	this._parse(1, function(pstrlen) {
		pstrlen = pstrlen.readUInt8(0);
		self._parse(pstrlen + 48, function(handshake) {
			handshake = handshake.slice(pstrlen);
			self._onhandshake(handshake.slice(8, 28), handshake.slice(28, 48), {dht: !!(handshake[7] & 1)});
			self._parse(4, onmessagelength);
		});
	});
};

Wire.prototype.__proto__ = Duplex.prototype;

Wire.prototype.handshake = function(infoHash, peerId, extensions) {
	if (typeof infoHash === 'string') infoHash = new Buffer(infoHash, 'hex');
	if (typeof peerId === 'string') peerId = new Buffer(peerId);
	if (infoHash.length !== 20 || peerId.length !== 20) throw new Error('infoHash and peerId MUST have length 20');

	var reserved = new Buffer([0,0,0,0,0,0,0,0]);
	if (extensions && extensions.dht) reserved[7] |= 1;

	this._push(Buffer.concat([MESSAGE_PROTOCOL, reserved, infoHash, peerId], MESSAGE_PROTOCOL.length+48));
};

Wire.prototype.choke = function() {
	if (this.amChoking) return;
	this.amChoking = true;
	while (this._peerRequests.size()) this._peerRequests.shift()(new Error('wire is choked'));
	this._push(MESSAGE_CHOKE);
};

Wire.prototype.unchoke = function() {
	if (!this.amChoking) return;
	this.amChoking = false;
	this._push(MESSAGE_UNCHOKE);
};

Wire.prototype.interested = function() {
	if (this.amInterested) return;
	this.amInterested = true;
	this._push(MESSAGE_INTERESTED);
};

Wire.prototype.uninterested = function() {
	if (!this.amInterested) return;
	this.amInterested = false;
	this._push(MESSAGE_UNINTERESTED);
};

Wire.prototype.bitfield = function(bitfield) {
	if (bitfield.buffer) bitfield = bitfield.buffer; // support bitfield objects
	this._message(ID_BITFIELD, [], bitfield);
};

Wire.prototype.have = function(i) {
	this._message(ID_HAVE, [i]);
};

Wire.prototype.setKeepAlive = function(bool) {
	clearInterval(this._keepAlive);
	if (bool === false) return;
	this._keepAlive = setInterval(this.push.bind(this, MESSAGE_KEEP_ALIVE), 60000);
};

Wire.prototype.setTimeout = function(ms, fn) {
	this._requests.setTimeout(ms);
	if (fn) this.on('timeout', fn);
};

Wire.prototype.__defineGetter__('peerRequests', function() {
	return this._peerRequests.size();
});

Wire.prototype.__defineGetter__('requests', function() {
	return this._requests.size();
});

Wire.prototype.request = function(i, offset, length, callback) {
	if (!callback) callback = noop;
	if (this._finished) return callback(new Error('wire is closed'));
	if (this.peerChoking) return callback(new Error('peer is choking'));
	this._requests.push(i, offset, length, callback);
	this._message(ID_REQUEST, [i, offset, length]);
};

Wire.prototype.cancel = function(i, offset, length) {
	if (!arguments.length) return this._requests.forEach(this.cancel.bind(this));
	(this._requests.pull(i, offset, length) || noop)(new Error('request was cancelled'));
	this._message(ID_CANCEL, [i, offset, length]);
};

Wire.prototype.piece = function(i, offset, block) {
	this.uploaded += block.length;
	this.emit('upload', block.length);
	this._message(ID_PIECE, [i, offset], block);
};

Wire.prototype.port = function(port) {
	var message = new Buffer('\x00\x00\x00\x03\x09\x00\x00');
	message.writeUInt16BE(port, 5);
	this._push(message);
};

Wire.prototype.destroy = function() {
	this.emit('close');
	this.end();
};

// inbound

Wire.prototype._onhandshake = function(infoHash, peerId, extensions) {
	this.peerExtensions = extensions;
	this.emit('handshake', infoHash, peerId, extensions);
};

Wire.prototype._oninterested = function() {
	this.peerInterested = true;
	this.emit('interested');
};

Wire.prototype._onuninterested = function() {
	this.peerInterested = false;
	this.emit('uninterested');
};

Wire.prototype._onchoke = function() {
	this.peerChoking = true;
	this.emit('choke');
	while (this._requests.size()) this._requests.shift()(new Error('peer is choking'));
};

Wire.prototype._onunchoke = function() {
	this.peerChoking = false;
	this.emit('unchoke');
};

Wire.prototype._onbitfield = function(buffer) {
	var pieces = bitfield(buffer);
	for (var i = 0; i < 8 * buffer.length; i++) {
		this.peerPieces[i] = pieces.get(i);
	}
	this.emit('bitfield', buffer);
};

Wire.prototype._onhave = function(i) {
	this.peerPieces[i] = true;
	this.emit('have', i);
};

Wire.prototype._onrequest = function(i, offset, length) {
	if (this.amChoking) return;

	var self = this;
	var respond = function(err, block) {
		if (self._peerRequests.pull(i, offset, length) !== respond) return;
		if (err) return;
		self.piece(i, offset, block);
	};

	this._peerRequests.push(i, offset, length, respond);
	this.emit('request', i, offset, length, respond);
};

Wire.prototype._oncancel = function(i, offset, length) {
	this._peerRequests.pull(i, offset, length);
	this.emit('cancel', i, offset, length);
};

Wire.prototype._onpiece = function(i, offset, block) {
	(this._requests.pull(i, offset, block.length) || noop)(null, block);
	this.downloaded += block.length;
	this.emit('download', block.length);
	this.emit('piece', i, offset, block);
};

Wire.prototype._onport = function(port) {
	this.emit('port', port);
};

// helpers and streams

Wire.prototype._message = function(id, numbers, data) {
	var dataLength = data ? data.length : 0;
	var buffer = new Buffer(5 + 4 * numbers.length);

	buffer.writeUInt32BE(buffer.length + dataLength - 4, 0);
	buffer[4] = id;
	numbers.forEach(function(num, i) {
		buffer.writeUInt32BE(num, 5 + 4 * i);
	});

	this._push(buffer);
	if (data) this._push(data);
};

Wire.prototype._push = function(data) {
	if (this._finished) return;
	this.push(data);
};

Wire.prototype._parse = function(size, parser) {
	this._parserSize = size;
	this._parser = parser;
};

Wire.prototype._write = function(data, encoding, callback) {
	this._bufferSize += data.length;
	this._buffer.push(data);

	while (this._bufferSize >= this._parserSize) {
		var buffer = this._buffer.length === 1 ? this._buffer[0] : Buffer.concat(this._buffer, this._bufferSize);
		this._bufferSize -= this._parserSize;
		this._buffer = this._bufferSize ? [buffer.slice(this._parserSize)] : [];
		this._parser(buffer.slice(0, this._parserSize));
	}

	callback();
};

Wire.prototype._read = noop;

module.exports = Wire;