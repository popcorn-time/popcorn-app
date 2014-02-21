# compact2string

Convert bittorrent's [compact](http://wiki.theory.org/BitTorrent_Tracker_Protocol#Peer_Dictionary_Format) ip/host binary returned by Trackers to 'hostname:port' string.

## Installation

```npm install compact2string```

## Usage

### Single compact2string	

```javascript
var compact2string = require("compact2string");
var Buffer = require("buffer").Buffer;
var ipport = compact2string(new Buffer("0A0A0A05FF80", "hex"));
console.log(ipport);
```

=> ```"10.10.10.5:65408" ```

### Multiple in same buffer
	
```javascript
var hostports = compact2string.multi(new Buffer("0A0A0A05008064383a636f6d", "hex"));
console.log(hostports);
```

=> ```[ '10.10.10.5:128', '100.56.58.99:28525' ]```

## Licence

(MIT Licence)