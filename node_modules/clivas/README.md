# clivas

Turn your terminal into a canvas.

It is available through npm:

	npm install clivas

## Usage

It is easy to use

``` js
var clivas = require('clivas');

var frame = 0;

setInterval(function() {
	clivas.clear(); // clears the canvas
	clivas.line('hello world (#frame '+frame+')');
	clivas.line('{red:also} {green:colors}!');
	frame++;
}, 200);
```

When you draw something with clivas you can use the format patten to help you

``` js
clivas.line('{red:i am red} and {blue: i am blue}');
```

If you wanted to inverse a color you would provide the inverse tag

``` js
clivas.line('{red+inverse:i am inversed}');
```

The format pattern can also help you add whitespace

``` js
clivas.line('[{10:===>}]'); // prints [===>      ]
```

## API

* `clivas.clear()` - Clears the screen. If you called `clivas.pin()` it would only clear up until the pin.

* `clivas.flush()` - Clears everything below the cursor.

* `clivas.pin([lineNumber])` - Only clear to here when `clivas.clear()` is called

* `clivas.line(str)` - Write a line (accepts a format string as described above)

* `clivas.write(str)` - Same as `clivas.line(str)` except it does not add a newline

* `clivas.cursor(enable)` - Enable or disable the terminal cursor

* `clivas.alias(name, value)` - Add an alias to the format pattern i.e. `clivas.alias('link', 'red+underline')` enables you to use `{link:http://google.com}`

## License

MIT