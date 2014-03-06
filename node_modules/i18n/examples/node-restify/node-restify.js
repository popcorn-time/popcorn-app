/**
 * This example is intended to show a basic restify setup and
 * also to be run as integration test for concurrency issues.
 *
 * Please remove setTimeout(), if you intend to use it as a blueprint!
 *
 */

// require modules
var restify = require('restify'),
    i18n = require('../../i18n'),
    url = require('url'),
    app;

// minimal config
i18n.configure({
  locales: ['en', 'de'],
  directory: __dirname + '/locales'
});

// Create the RESTify server
app = restify.createServer();

// enable i18n in restify
app.use(i18n.init);

// setup a simple resource
app.get('/test', function (req, res, next) {
  var delay = app.getDelay(req, res);

  setTimeout(function () {
    res.send(200, {
      'somevartoreturn': res.__('Hello')
    });
  }, delay);

  return next();
});

// Start the app!
app.listen(3000);

// simple param parsing
app.getDelay = function (req, res) {
  return url.parse(req.url, true).query.delay || 0;
};
