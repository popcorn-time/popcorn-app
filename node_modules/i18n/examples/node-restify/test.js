require('./node-restify');

var Browser = require('zombie'),
    visitRest = require('../testlib/visitrest'),
    DE = new Browser({
      headers: {
        'accept-language': 'de'
      }
    }),
    EN = new Browser(
      {
      headers: {
        'accept-language': 'en'
      }
    });

describe('Using res.__() in an restify app should handle concurrent request correctly', function(){
    describe('serial requests', function () {
      visitRest('series', 'test', EN, 'Hello', DE, 'Hallo', 'somevartoreturn');
    });

    describe('parallel requests', function () {
      visitRest('parallel', 'test', EN, 'Hello', DE, 'Hallo', 'somevartoreturn');
    });
});