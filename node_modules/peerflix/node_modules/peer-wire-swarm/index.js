var EventEmitter = require('events').EventEmitter;
var crypto = require('crypto');
var dgram = require('dgram');
var net = require('net');
var once = require('once');
var compact2string = require('compact2string');
var bncode = require('bncode');

var MAX_NODES = 5000;
var TIMEOUT = 5000;
var MAX_PARALLEL = 10;

var randomId = function() {
	var bytes = crypto.randomBytes(2000);
	var offset = 0;

	return function() {
		var id = bytes.slice(offset, offset + 20);
		offset = (offset + 20) % bytes.length;
		return id;
	};
}();

var parseNodeInfo = function(compact) {
	try {
		var nodes = [];
		for (var i = 0; i < compact.length; i += 26) {
			nodes.push(compact2string(compact.slice(i+20, i+26)));
		}
		return nodes;
	} catch(err) {
		return [];
	}
};

var parsePeerInfo = function(list) {
	try {
		return list.map(compact2string);
	} catch (err) {
		return [];
	}
};

var Swarm = function(infoHash, options, onconnection) {
	if (!(this instanceof Swarm)) return new Swarm(infoHash, options, onconnection);
	EventEmitter.call(this);

	if (typeof options === 'function') {
		onconnection = options;
		options = {};
	}

	options = options || {};

	if (typeof infoHash === 'string') infoHash = new Buffer(infoHash, 'hex');

	this.maxSize = options.maxSize || 60;
	this.infoHash = infoHash;
	this.nodeId = randomId();

	this._t = 0;
	this._sock = dgram.createSocket('udp4');
	this._visitedNodes = {};
	this._visitedPeers = {};

	this.queue = [];
	this.nodesQueue = [];
	this.connections = [];
	this.prioritized = {};
	this.reconnecting = {};

	var self = this;
	var node = this.node.bind(this);
	var peer = this.peer.bind(this);

	this._sock.on('error', function() {
		// ... ignore error ...
	});
	this._sock.on('message', function(message, remote) {
		self._visitedNodes[remote.address+':'+remote.port] = true;

		try {
			message = bncode.decode(message);
		} catch (err) {
			return;
		}

		var nodes = message && message.r && message.r.nodes;
		var values = message && message.r && message.r.values;

		if (nodes) parseNodeInfo(nodes).forEach(node);
		if (values) parsePeerInfo(values).forEach(peer);
	});

	if (onconnection) this.on('connection', onconnection);
};

Swarm.prototype.__proto__ = EventEmitter.prototype;

Swarm.prototype.listen = function() {
	this.node('router.bittorrent.com:6881');
	this.node('router.utorrent.com:6881');
	this.node('dht.transmissionbt.com:6881');
	return this;
};

Swarm.prototype.connect = function(peer) {
	if (this.prioritized[peer]) {
		this.queue.unshift(peer);
	} else {
		this.queue.push(peer);
	}

	this._connect();
};

Swarm.prototype.reconnect = function(peer) {
	this.prioritized[peer] = true;
	this._connect();
};

Swarm.prototype.peer = function(peer) {
	if (this._visitedPeers[peer]) return;
	this._visitedPeers[peer] = true;
	this.connect(peer);
};

Swarm.prototype.node = function(addr) {
	if (this._visitedNodes[addr]) return;
	if (Object.keys(this._visitedNodes).length >= MAX_NODES) return;
	if (this.queue.length) return this.nodesQueue.push(addr);

	var t = ''+(this._t++);
	var message = bncode.encode({t:t,y:'q',q:'get_peers',a:{id:this.nodeId,info_hash:this.infoHash}});
	var port = addr.split(':')[1];
	var host = addr.split(':')[0];

	this._sock.send(message, 0, message.length, port, host);
};

Swarm.prototype._connect = function() {
	if (!this.queue.length || this.connections.length >= this.maxSize) return;

	var self = this;
	var peer = this.queue.shift();
	var port = peer.split(':')[1];
	var host = peer.split(':')[0];

	var socket = net.connect(port, host);

	var onclose = once(function() {
		self.connections.splice(self.connections.indexOf(socket), 1);
		self._connect();
		if (!self.queued.length && self.nodesQueue.length) self.node(self.nodesQueue.shift());
		if (!connected) return;
		self.reconnecting[peer]++;
		setTimeout(self.connect.bind(self, peer), self.reconnecting[peer] * 5000);
	});

	socket.on('error', onclose);
	socket.on('close', onclose);
	socket.on('end', function() {
		socket.end(); // no half open
		onclose();
	});

	var ontimeout = function() {
		socket.destroy();
	};

	var timeout = setTimeout(ontimeout, TIMEOUT);
	var connected = false;

	socket.on('connect', function() {
		connected = true;
		clearTimeout(timeout);
		self.reconnecting[peer] = 0;
		self.emit('connection', socket, peer, peer);
	});

	this.connections.push(socket);
};

// TODO: remove me
Swarm.prototype.__defineGetter__('peersFound', function() {
	return Object.keys(this._visitedPeers).length;
});

Swarm.prototype.__defineGetter__('nodesFound', function() {
	return Object.keys(this._visitedNodes).length;
});

Swarm.prototype.__defineGetter__('queued', function() {
	return this.queue.length;
});

module.exports = Swarm;
