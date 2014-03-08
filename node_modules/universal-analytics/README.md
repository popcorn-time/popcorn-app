universal-analytics
=======

A node module for Google's [Universal Analytics](http://support.google.com/analytics/bin/answer.py?hl=en&hlrm=de&answer=2790010) tracking via the [Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/v1/).

This module allows tracking data (or rather, users) from within a Node.js application. Tracking is initiated on the server side and, if required, does not require any more tracking in the browser.

`universal-analytics` currently supports the following tracking features:

* Pageviews
* Events
* E-Commerce with transactions and items
* Exceptions
* User timings

[![Build Status](https://travis-ci.org/peaksandpies/universal-analytics.png?branch=master)](https://travis-ci.org/peaksandpies/universal-analytics)

## Getting started

`universal-analytics` is installed and included like any other node module:

```
$ npm install universal-analytics
```

```javascript
var ua = require('universal-analytics');
```

Initialization expects at least your Google Analytics account ID:

```javascript
var visitor = ua('UA-XXXX-XX');
```

This will create a `universal-analytics` Visitor instance that you can use and keep around to track a specific user. Since no user UUID was specified in the constructor's arguments, a random UUID is generated. In case you have a user UUID at hand, you can use that to create the visitor:

```javascript
var visitor = ua('UA-XXXX-XX', '6a14abda-6b12-4578-bf66-43c754eaeda9');
```

Starting with Universal Analytics, a UUID v4 is the preferred user ID format. It is therefor necessary to provide a UUID of such type to `universal-analytics`. However you can force custom user ID, passing `strictCidFormat: false` in the options:

```javascript
var visitor = ua('UA-XXXX-XX', 'CUSTOM_USERID_1', {strictCidFormat: false});
```

Tracking a pageview without much else is now very simple:

```javascript
visitor.pageview("/").send()
```

The first argument for the pageview method is the path of the page to be tracked. Simply calling `pageview()` will not initiate a tracking request. In order to send off tracking to the Google Analytics servers you have two options:

1. You can append a `send()` call after `pageview()`. The tracking request is sent asynchronously. This means you will not receive any confirmation when and if it was successful.
2. You can provide a callback function to `pageview()` as an additional, last argument. This callback will be invoked once the tracking request has finished. Any error that occured during the request will be provided to said callback. In that case `send()` is no longer necessary.

An example of the callback approach:

```javascript
var visitor = ua('UA-XXXX-XX');
visitor.pageview("/", function (err) {
  // Handle the error if necessary.
  // In case no error is provided you can be sure
  // the request was successfully sent off to Google.
});
```


## Pageview tracking

The first argument for the pageview tracking call is the page path. Furthermore, pageview tracking can be improved with the additional parameters to provide the page's hostname and title to Google Analytics. The parameters are provided as arguments after the page path.

```javascript
visitor.pageview("/", "Welcome", "http://joergtillmann.com").send();
```

The following snippet is the exact same tracking using a callback. It is always the last argument.

```javascript
visitor.pageview("/", "Welcome", "http://joergtillmann.com", function (err) {
  // …
});
```

Depending on how you integrate tracking into your app, you might be more comfortable with providing all the tracking data via a params object to the `pageview()` method:

```javascript
visitor.pageview({dp: "/", dt: "Welcome", dh: "http://joergtillmann.com"}).send();
```

This code has the exact same effect as the one above. `dp`, `dt`, and `dh` (as in 'document path', 'document title' and 'document hostname') are the attribute names used by the Measurement Protocol.

The page path (or `dp`) is  mandatory. Google Analytics can not track a pageview without a path. To avoid such erroneous requests, `universal-analytics` will deny `pageview()` tracking if the path is omitted.

```javascript
var pagePath = null;

visitor.pageview(pagePath, function (err) {
  // This callback will receive an error
});
```

The following method signatures are available for the `pageview()` method of the Visitor instance:

* `Visitor#pageview(path)`
* `Visitor#pageview(path, callback)`
* `Visitor#pageview(params)`
* `Visitor#pageview(params, callback)`
* `Visitor#pageview(path, hostname)`
* `Visitor#pageview(path, hostname, callback)`
* `Visitor#pageview(path, title, hostname)`
* `Visitor#pageview(path, title, hostname, callback)`

## Event tracking


Tracking events with `universal-analytics` works like pageview tracking, only you have to provide different arguments:

```javascript
visitor.event("Event Category", "Event Action").send()
```

This is the most straightforward way to track an event. The event attributes *label* and *value* are optional and can be provided if necessary:

```javascript
visitor.event("Event Category", "Event Action", "…and a label", 42).send()
```

Just like pageview tracking, event tracking supports a callback as the last argument:

```javascript
visitor.event("Event Category", "Event Action", "…and a label", 42, function (err) {
  // …
})
```

An additional attribute for events is the path of the page they should be associated with in Google Analytics. You can provide this path via an additional params object:

```javascript
visitor.event("Event Category", "Event Action", "…and a label", 42, {p: "/contact"}, function (err) {
  // …
})
```

*Notice:* The page path attribute for the event is called `p` which differs from the `dp` attribute used in the pageview tracking example. `universal-analytics` is smart enough to use the `dp` attribute should you provide it instead of `p`.

In case this argument list is getting a little long, `event()` also accepts a params object like `pageview()`:

```javascript
var params = {
  ec: "Event Category",
  ea: "Event Action",
  el: "…and a label",
  ev: 42,
  dp: "/contact"
}

visitor.event(params).send();
```

The category (`ec`) and the action (`ea`) are mandatory. Google Analytics will not track an event without them. To avoid such erroneous requests, universal-analytics will deny `event()` tracking if either attribute is omitted.

```javascript
var action = null;

visitor.event("Navigation clicks", action, function (err) {
  // This callback will receive an error
});
```

The following method signatures are available for #event:

* `Visitor#event(category, action)`
* `Visitor#event(category, action, callback)`
* `Visitor#event(category, action, label)`
* `Visitor#event(category, action, label, callback)`
* `Visitor#event(category, action, label, value)`
* `Visitor#event(category, action, label, value, callback)`
* `Visitor#event(category, action, label, value, params, callback)`
* `Visitor#event(params)`
* `Visitor#event(params, callback)`



### Daisy-chaining tracking calls

We have seen basic daisy-chaining above when calling `send()` right after `pageview()` and `event()`:

```javascript
visitor.pageview("/").send()
```

Every call of a tracking method returns a visitor instance you can re-use:

```javascript
visitor.pageview("/").pageview("/contact").send()
```

Granted, the chance of this example actually happening in practice might be rather low.

However, `universal-analytics` is smart when it comes to daisy-chaining certain calls. In many cases, a `pageview()` call is instantly followed by an `event()` call to track some additional information about the current page. `universal-analytics` makes creating the connection between the two easy:

```javascript
visitor.pageview("/landing-page-1").event("Testing", "Button color", "Blue").send()
```
This is the same as two distinct tracking calls.

```javascript
visitor.pageview("/landing-page-1").send()
visitor.event("Testing", "Button color", "Blue", {p: "/landing-page-1"}).send()
```

Daisy-chaining is context-aware and in this case placing the `event()` call right after the `pageview()` call results in the event being associated with the page path tracking in the `pageview()` call. Even though the attributes (`dp` and `p`)  are different internally.

It also works when using a callback since the `this` inside the callback will be the `universal-analytics` Visitor instance:

```javascript
visitor.pageview("/landing-page-1", function (err) {
  if (!err) {
    this.event("Testing", "Button color", "Blue").send()
  }
});
```

More generally, the daisy-chaining context keeps all parameters from the previous call around. This means in a situation where similar tracking calls are necessary tracking is simplified:

```javascript
visitor
  .event({ec: "Mail Server", ea: "New Team Member Notification sent"})
  .event({ea: "Invitation sent"})
  .send();
```

In this example the event category ("Mail Server") is not repeated in the second tracking call.


### E-commerce tracking

E-commerce tracking in general is a bit more complex. It requires a combination of one call to the `transaction()` method and one or more calls to the `item()` method.

```javascript
visitor
  .transaction("trans-12345", 500)   // Create transaction trans-12345 worth 500 total.
  .item(300, 1, "item-54321")        // Add 1 unit the item item-54321 worth 300.
  .item(200, 2, "item-41325")        // Add 2 units the item item-41325 worth 200.
  .send()
```

Once again, daisy-chaining simplifies associating the items with the transaction. Officially, nothing but the transaction ID is a requirement for both the transaction and the items. However, providing a minimum set of information (revenue for the transaction, price, quantity and ID for the items) is recommended.

It is also possible to provide the params as an object to both methods:

```javascript
visitor
  .transaction({ti: "trans-12345", tr: 500, ts: 50, tt: 100, ta: "Partner 13"})
  .item({ip: 300, iq: 1, ic: "item-54321", in: "Item 54321", iv: "Blue"})
  .item({ip: 200, iq: 2, ic: "item-41325", in: "Item 41325", iv: "XXL"})
  .send()
```

In case an additional item has to be added later on or daisy-chaining is not available for another reason, each item can be given an associated transaction ID via the params object as well:

visitor.item({ip: 100, iq: 1, ic: "item-41325", in: "Item 41325", iv: "XL", ti: "trans-12345"}).send()

The transaction ID (`ti`) is mandatory for both the transaction and the item. Google Analytics will not track e-commerce data without it. To avoid such erroneous requests, universal-analytics will deny `transaction()` and `item()` tracking if it is omitted.

```javascript
var ti = null;

visitor.transaction(ti, function (err) {
  // This callback will receive an error
});
```

The following method signatures are available for #transaction:

* `Visitor#transaction(id)`
* `Visitor#transaction(id, callback)`
* `Visitor#transaction(id, revenue)`
* `Visitor#transaction(id, revenue, callback)`
* `Visitor#transaction(id, revenue, shipping)`
* `Visitor#transaction(id, revenue, shipping, callback)`
* `Visitor#transaction(id, revenue, shipping, tax)`
* `Visitor#transaction(id, revenue, shipping, tax, callback)`
* `Visitor#transaction(id, revenue, shipping, tax, affiliation)`
* `Visitor#transaction(id, revenue, shipping, tax, affiliation, callback)`
* `Visitor#transaction(params)`
* `Visitor#transaction(params, callback)`

The following method signatures are available for #item:

* `Visitor#item(price)`
* `Visitor#item(price, callback)`
* `Visitor#item(price, quantity)`
* `Visitor#item(price, quantity, callback)`
* `Visitor#item(price, quantity, sku)`
* `Visitor#item(price, quantity, sku, callback)`
* `Visitor#item(price, quantity, sku, name)`
* `Visitor#item(price, quantity, sku, name, callback)`
* `Visitor#item(price, quantity, sku, name, variation)`
* `Visitor#item(price, quantity, sku, name, variation, callback)`
* `Visitor#item(price, quantity, sku, name, variation, params)`
* `Visitor#item(price, quantity, sku, name, variation, params, callback)`
* `Visitor#item(params)`
* `Visitor#item(params, callback)`


### Exception tracking

Exception tracking is a way to keep track of any sort of application errors and bugs with Google Analytics. Using it with this module is a way to capture server-side problems.

```javascript
visitor.exception("StackOverflow Error").send()
```

As an additional information, the exception can be flagged as fatal if the error was exceptionally bad.

```javascript
var fatal = true;
visitor.exception("StackOverflow Error", fatal, function () {
  // Finish handling this error
});
```

The following method signatures are available for #exception:

* `Visitor#exception(description)`
* `Visitor#exception(description, callback)`
* `Visitor#exception(description, fatal)`
* `Visitor#exception(description, fatal, callback)`
* `Visitor#exception(params)`
* `Visitor#exception(params, callback)`



### User timing tracking

Tracking user timings is a way to capture time-based information similar to the page load speed data tracked automatically by Google Analytics. All arguments to this tracking method are optional, but a category, a variable and a time value should be provided. The time value should be provided in milliseconds.

```javascript
visitor.timinig("User interaction", "Time to open login overlay", 12547).send()
```

The following method signatures are available for #timing:

* `Visitor#timing(category)`
* `Visitor#timing(category, callback)`
* `Visitor#timing(category, variable)`
* `Visitor#timing(category, variable, callback)`
* `Visitor#timing(category, variable, time)`
* `Visitor#timing(category, variable, time, callback)`
* `Visitor#timing(category, variable, time, label)`
* `Visitor#timing(category, variable, time, label, callback)`
* `Visitor#timing(params)`
* `Visitor#timing(params, callback)`



## Session-based identification

In order to make session-based apps easier to work with, `universal-analytics` also provides a middleware that works in an Expressjs-style fashion. It will try to detect a client ID based on the `_ga` cookie used by the analytics.js client-side tracking. Additionally it will store the detected client ID in the current session to recognize the visitor later.

```javascript
var ua = require("universal-analytics");
var express = require("express");

var app = express()

express.use(ua.middleware("UA-XXXX-Y", {cookieName: '_ga'}));
```

The middleware will attach the `universal analytics` visitor instance to every request (`req.visitor`).

Additionally, the module also exposes a `createFromSession` method to create a visitor instance simply based on a session, which is helpful when working with Socket.io, etc. where the middleware is not used.

```javascript
var visitor = ua.createFromSession(socket.handshake.session);
```



## Debug mode

`universal-analytics` can be instructed to output information during tracking by enabling the debug mode:

```javascript
var visitor = ua("UA-XXXX-XX").debug()
// … and so forth.
```



## Shortcuts

The tracking methods have shortcuts:

* `Visitor#pv` as an alias for `Visitor#pageview`
* `Visitor#e` as an alias for `Visitor#event`
* `Visitor#t` as an alias for `Visitor#transaction`
* `Visitor#i` as an alias for `Visitor#item`


# Tests

The tests are written with [mocha](https://github.com/visionmedia/mocha) using [should](https://github.com/visionmedia/should.js) and [Sinon.JS](https://github.com/cjohansen/Sinon.JS).

Run them by executing the following commands in the `universal-analytics` directory:

```
$ npm install
$ make test
```

## License

(The MIT License)

Copyright (c) 2013 Jörg Tillmann &lt;universal-analytics@joergtillmann.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.























