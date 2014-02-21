# read-torrent

read and parse a torrent from a resource

	npm install read-torrent

# usage

``` js
var readTorrent = require('read-torrent');

readTorrent('http://my-server.com/file.torrent', function(err, torrent) {
	// we loaded a torrent from a server
});

readTorrent('mydir/file.torrent', function(err, torrent) {
	// we loaded a torrent from a file
});
```

The torrent result looks like this

``` js
{
	name: 'torrent name',
	created: new Date(...),
	announce: [
		// list of annouce urls
	],
	infoHash: 'infoHash as a hex string',
	files: [{
		name: 'name of file',
		path: 'suggested file path',
		offset: absoluteOffset,
		length: lengthOfFile
	}],
	pieceLength: lengthOfAPiece,
	pieces: [
		// list of sha1 hex strings
	]
}
```

# command-line interface

there is also a command-line interface available if you install it with `-g`

	npm install -g read-torrent

this installs a program called `read-torrent` that you simply pass a torrent file or url

	read-torrent http://my-server.com/file.torrent

this will print all meta info of the torrent file to the terminal
