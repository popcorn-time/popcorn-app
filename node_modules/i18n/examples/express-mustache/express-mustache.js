/**
 * This example is intended to show a mustache custom helper function
 * in express setup andalso to be run as integration test for concurrency issues.
 *
 * Please remove setTimeout(), if you intend to use it as a blueprint!
 *
 */

// require modules
var express = require('express'),
    i18n = require('../../i18n'),
    url = require('url'),
    // consolidates template engines, @see https://github.com/visionmedia/consolidate.js
    cons = require('consolidate'),
    app = module.exports = express();

// minimal config
i18n.configure({
  locales: ['en', 'de'],
  cookie: 'yourcookiename',
  directory: __dirname + '/locales'
});

app.configure(function () {
  // setup mustache to parse .html files
  app.set('view engine', 'html');
  app.set('views', __dirname + '/views');
  app.engine('html', cons.mustache);

  // you'll need cookies
  app.use(express.cookieParser());

  // init i18n module for this loop
  app.use(i18n.init);

  // register helper as a locals function wrapped as mustache expects
  app.use(function (req, res, next) {
    // mustache helper
    res.locals.__ = function () {
      return function (text, render) {
        return i18n.__.apply(req, arguments);
      };
    };

    next();
  });
});

app.get('/', function (req, res) {
  // delay a response to simulate a long running process,
  // while another request comes in with altered language settings
  setTimeout(function () {
    res.render('index', {
      'name': 'Marcus',
      'result': res.__n('Result: %d cat', 'Result: %d cats', 3)
    });
  }, app.getDelay(req, res));
});

// simple param parsing
app.getDelay = function (req, res) {
  return url.parse(req.url, true).query.delay || 0;
};

// startup
app.listen(3000);
