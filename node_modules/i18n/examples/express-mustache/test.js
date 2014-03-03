require('./express-mustache');

var Browser = require('zombie'),
    visitLinks = require('../testlib/visitLinks'),
    DE = new Browser(),
    EN = new Browser();

EN.cookies('localhost', '/').set("yourcookiename", "en");
DE.cookies('localhost', '/').set("yourcookiename", "de");

describe('Using i18n in express 3.x with mustache custom helpers via consolidate', function () {
  describe('res.__() is able to handle concurrent request correctly', function () {
    describe('serial requests', function () {
      visitLinks('series', '', EN, 'Hello Marcus Result: 3 cats', DE, 'Hallo Marcus Ergebnis: 3 Katzen');
    });

    describe('parallel requests', function () {
      visitLinks('parallel', '', EN, 'Hello Marcus Result: 3 cats', DE, 'Hallo Marcus Ergebnis: 3 Katzen');
    });
  });
});
