/**
 * This example is intended to show a cookie usage in express setup and
 * also to be run as integration test for concurrency issues.
 *
 * Please remove setTimeout(), if you intend to use it as a blueprint!
 *
 */

// require modules
var express = require('express'),
    i18n = require('../../i18n'),
    url = require('url'),
    app = module.exports = express();

// minimal config
i18n.configure({
  locales: ['en', 'de'],
  cookie: 'yourcookiename',
  directory: __dirname+'/locales'
});

app.configure(function () {
  // you'll need cookies
  app.use(express.cookieParser());

  // init i18n module for this loop
  app.use(i18n.init);

});

app.get('/test', function (req, res) {
  // delay a response to simulate a long running process,
  // while another request comes in with altered language settings
  setTimeout(function () {
    res.send('<body>' + res.__('Hello') + '</body>');
  }, app.getDelay(req, res));
});

app.get('/testfail', function (req, res) {
  // delay a response to simulate a long running process,
  // while another request comes in with altered language settings
  setTimeout(function () {
    res.send('<body>' + i18n.__('Hello') + '</body>');
  }, app.getDelay(req, res));
});

// simple param parsing
app.getDelay = function (req, res) {
  return url.parse(req.url, true).query.delay || 0;
};

// startup
app.listen(3000);
