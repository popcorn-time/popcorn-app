# peer-swarm

a peer swarm implementation that uses the torrent DHT to find peers

	npm install peer-swarm

# usage

``` js
var peerSwarm = require('peer-swarm');
var swarm = peerSwarm(myInfoHash);

swarm.on('connection', function(connection) {
	// a relevant connection has appeared
	// you should pipe this to a torrent protocol stream
});

swarm.listen();
```
