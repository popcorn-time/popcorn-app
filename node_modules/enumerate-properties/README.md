# node-enumerate-properties

[![Build Status](https://api.travis-ci.org/thibaultCha/node-enumerate-properties.png)](https://travis-ci.org/thibaultCha/node-enumerate-properties) [![NPM version](https://badge.fury.io/js/enumerate-properties.png)](http://badge.fury.io/js/enumerate-properties)

Enumerates, get and set JavaScript objects properties in a dot notation format

### Install

```
$ npm install enumerate-properties
```

### Usage

```javascript
var properties = require('enumerate-properties')

obj = 
{ foo: 'bar'
, bar: 'foo'
, nested:
  { foo: 'bar'
  , bar: 'foo'
  }
, foobar: 'barfoo'
}

// Enumerate
properties.enumerate(obj, function (key, value) {
  //i key         value
  //0 foo         'bar'
  //1 bar         'foo'
  //2 nested.foo  'bar'
  //3 nested.bar  'foo'
  //4 foobar      'barfoo'
})

// Get	
var prop = properties.getAtPath(obj, 'nested.foo') // return 'bar'

// Set
properties.setAtPath(obj, 'nested.foo', 'newvalue') // obj.nested.foo === 'newvalue'
properties.setAtPath(obj, 'newpath.nested', 'newvalue') // obj.newpath.nested is created
```

### Who use it

- **[Equiprose](http://www.equiprose.org)**

### Licence

Copyright (C) 2013 by Thibault Charbonnier.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
