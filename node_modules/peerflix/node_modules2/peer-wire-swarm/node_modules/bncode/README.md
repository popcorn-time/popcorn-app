[![build status](https://secure.travis-ci.org/a2800276/bencode.js.png)](http://travis-ci.org/a2800276/bencode.js)
# bencoding for JS (node.js)


This is a small library to encode and decode bencoded (bittorrent) stuff. 
Bencoding is specified [here](http://www.bittorrent.org/beps/bep_0003.html).


## Get & Install

github repository is [here](https://github.com/a2800276/bencode.js)

Installable via npm (npm package name is **bncode**, note spelling!):

    npm install bncode


## Encoding

Encoding works as follows:

    var benc  = require("bencode"),
        exmp = {}
 
    exmp.bla = "blup"
    exmp.foo = "bar"
    exmp.one = 1
    exmp.woah = {}
    exmp.woah.arr = []
    exmp.woah.arr.push(1)
    exmp.woah.arr.push(2)
    exmp.woah.arr.push(3)
    exmp.str = new Buffer("Buffers work too")
 
    var bencBuffer = benc.encode(exmp)
 
    // d3:bla4:blup3:foo3:bar3:onei1e4:woahd3:arr \
    // li1ei2ei3eee3:str16:Buffers work tooe



## Decoding

Decoding will work progressively, e.g. if you're receiving partial
bencoded strings on the network:

    var benc = require("bencode"),
        buf  = null
 
    decoder = new bencode.decoder()
    while (buf = receiveData()) {
      decoder.decode(buf)
    }
    
    log(decoder.result())


Or "all in one"

    var benc = require("bencode"),
        buf  = getBuffer(),
        dec  = benc.decode(buf)
 
    log(dec.bla)


There are some subtleties concerning bencoded strings. These are
decoded as Buffer objects because they are just strings of raw bytes
and as such would wreak havoc with multi byte strings in javascript.

The exception to this is strings appearing as keys in bencoded
dicts. These are decoded as Javascript Strings, as they should always
be strings of (ascii) characters and if they weren't decoded as JS
Strings, dict's couldn't be mapped to Javascript objects.


## Mapping bencoding to Javascript

    
     +----------------------------------------------------+
     |                |                                   |
     |  Bencoded      |    Javascript                     |
     |====================================================|
     |  Strings       |    node Buffers, unless they are  |
     |                |    Dictionary keys, in which case |
     |                |    they become Javascript Strings |
     |----------------+-----------------------------------|
     |  Integers      |    Number                         |
     |----------------+-----------------------------------|
     |  Lists         |    Array                          |
     |----------------+-----------------------------------|
     |  Dictionaries  |    Object                         |
     |                |                                   |
     +----------------------------------------------------+


## Mapping Javascript to bencoding

The code makes a best effort to encode Javascript to bencoding. If you stick to basic 
types (Arrays, Objects with String keys and basic values, Strings, Buffers and Numbers) 
you should encounter suprises. Expect surprises (mainly not being able to round-trip 
encode/decode) if you encode fancy data-types.


## Author

bencode.js was written by Tim Becker (tim.becker@kuriositaet.de) I can be reached via 
email or (preferably) submit a bug to the github repository.


## Thanks

Roly Fentanes (fent) for bug reports.


## License

MIT, see `LICENSE`
