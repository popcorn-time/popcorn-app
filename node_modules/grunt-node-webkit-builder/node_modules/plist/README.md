# node-plist

Provides facilities for reading and writing Mac OS X Plist (property list) files. These are often used in programming OS X and iOS applications, as well as the iTunes
configuration XML file.

Plist files represent stored programming "object"s. They are very similar
to JSON. A valid Plist file is representable as a native JavaScript Object and vice-versa.

## Tests
`npm test`

## Usage
Parsing a plist from filename
``` javascript
var plist = require('plist');

var obj = plist.parseFileSync('myPlist.plist');
console.log(JSON.stringify(obj));
```

Parsing a plist from string payload
``` javascript
var plist = require('plist');

var obj = plist.parseStringSync('<plist><string>Hello World!</string></plist>');
console.log(obj);  // Hello World!
```

Given an existing JavaScript Object, you can turn it into an XML document that complies with the plist DTD

``` javascript
var plist = require('plist');

console.log(plist.build({'foo' : 'bar'}).toString());
```



### Deprecated methods
These functions work, but may be removed in a future release. version 0.4.x added Sync versions of these functions.

Parsing a plist from filename
``` javascript
var plist = require('plist');

plist.parseFile('myPlist.plist', function(err, obj) {
  if (err) throw err;

  console.log(JSON.stringify(obj));
});
```

Parsing a plist from string payload
``` javascript
var plist = require('plist');

plist.parseString('<plist><string>Hello World!</string></plist>', function(err, obj) {
  if (err) throw err;

  console.log(obj[0]);  // Hello World!
});
```
