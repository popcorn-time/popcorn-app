
```javascript
var ZIP = require("zip");
var data = new Buffer(...);
var reader = ZIP.Reader(data);
reader.toObject(charset_opt);
reader.forEach(function (entry) {});
reader.iterator();
```

Copyright 1999 Masanao Izumo <iz@onicos.co.jp> License Unknown
Copyright 2010 Tom Robinson (http://tlrobinson.net/) MIT License (enclosed)
Copyright 2011 Kristopher Michael Kowal MIT License (enclosed)

