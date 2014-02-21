# Peer Wire Protocol

peer-wire-protocol is a node stream implementation of the [peer wire protocol specification](https://wiki.theory.org/BitTorrentSpecification#Peer_wire_protocol_.28TCP.29).
The protocol is the main communication layer when transferring files using torrents and is used by [peerflix](https://github.com/mafintosh/peerflix).

It is available through npm:

	npm install peer-wire-protocol

## Usage is simple

Since the protocol is implemented as a stream all you have to do is pipe some to and from it

``` js
var pwp = require('peer-wire-protocol');
var net = require('net');

net.createServer(function(socket) {
	var wire = pwp();

	// pipe to and from the protocol
	socket.pipe(wire).pipe(socket);

	wire.on('handshake', function(infoHash, peerId) {
		// lets emit a handshake of our own as well
		wire.handshake(new Buffer('my info hash'), new Buffer('my peer id'));
	});

	wire.on('unchoke', function() {
		console.log('peer is no longer choking us: '+wire.peerChoking);
	});
}).listen(6881);
```

## Full API

### Handshaking

Send and receive a handshake from the peer. This is the first message.

``` js
// send a handshake to the peer
wire.handshake(infoHash, peerId, {dht:true});
wire.on('handshake', function(infoHash, peerId, extensions) {
	// receive a handshake
});
```

Both the `infoHash` and the `peerId` should be 20 bytes

### Choking

Check if you or the peer is choking

``` js
wire.peerChoking; // is the peer choking us?
wire.amChoking; // are we choking the peer?

wire.on('choke', function() {
	// the peer is now choking us
});
wire.on('unchoke', function() {
	// peer is no longer choking us
});
```

### Interested

See if you or the peer is interested

``` js
wire.peerInterested; // is the peer interested in us?
wire.amInterested; // are we interested in the peer?

wire.on('interested', function() {
	// peer is now interested
});
wire.on('uninterested', function() {
	// peer is no longer interested
});
```

### Bitfield

Exchange piece information with the peer

``` js
// send a bitfield to the peer
wire.bitfield(buffer);
wire.on('bitfield', function(bitfield) {
	// bitfield received from the peer
});

// send a have message indicating that you have a piece
wire.have(pieceIndex);
wire.on('have', function(pieceIndex) {
	// peer has sent you a have message
});
```

You can always see which pieces the peer have

``` js
wire.peerPieces[i]; // returns true if peer has piece i
```

### Requests

Send and respond to requests for pieces

``` js
// request a piece from a peer
wire.request(pieceIndex, offset, length, function(err, block) {
	if (err) {
		// there was an error (peer has started choking us etc)
		return;
	}
	// got piece
});

// cancel a request to a peer
wire.cancel(pieceIndex, offset, length);

// receive a request from a peer
wire.on('request', function(pieceIndex, offset, length, callback) {
	// ... read piece ...
	callback(null, piece); // respond back to the peer
});

wire.requests; // how many requests to we currently have pending
```

You can set a request timeout if you want to

``` js
wire.setTimeout(5000); // head request should take a most 5s to finish
```

If the timeout is triggered the request callback is called with an error and a `timeout` event is emitted.

### DHT and port

You can set the extensions flag `dht` in the handshake to `true` if you participate in the torrent dht.
Afterwards you can send your dht port

``` js
// send your port to the peer
wire.port(dhtPort);
wire.on('port', function(dhtPort) {
	// peer has sent a port to us
});
```

### Keep-Alive

You can enable the keep-alive ping (triggered every 60s)

``` js
// starts the keep alive
wire.setKeepAlive(true);
wire.on('keep-alive', function() {
	// peer sent a keep alive - just ignore it
});
```

### Transfer stats

Check how many bytes you have uploaded and download

``` js
wire.uploaded; // number of bytes uploaded
wire.downloaded; // number of bytes downloaded

wire.on('download', function(numberOfBytes) {
	...
});
wire.on('upload', function(numberOfBytes) {
	...
});
```

## License

MIT
