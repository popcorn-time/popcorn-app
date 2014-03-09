require('./express-handlebars');

var should = require('should'),
    Browser = require('zombie'),
    async = require('async'),
    browserEn = new Browser,
    browserFr = new Browser;

visitLinks = function (asyncMethod) {
  return it('should show /en in English and /fr in French', function (done) {
    return async[asyncMethod]([

    function (cb) {
      return browserEn.visit('http://localhost:3000/en?delay=1500', function () {
        var textEn, textOneCat, textTwoCats;
        textEn = browserEn.html('#text');
        textOneCat = browserEn.html('#onecat');
        textTwoCats = browserEn.html('#twocats');
        should.equal(browserEn.cookies().get('locale'), 'en');
        should.equal(textEn, '<span id="text">text to test</span>');
        should.equal(textOneCat, '<span id="onecat">1 cat</span>');
        should.equal(textTwoCats, '<span id="twocats">2 cats</span>');
        return cb();
      });
    }, function (cb) {
      return setTimeout(function () {
        return browserFr.visit('http://localhost:3000/fr', function () {
          var textFr, textOneCat, textTwoCats;
          textFr = browserFr.html('#text');
          textOneCat = browserFr.html('#onecat');
          textTwoCats = browserFr.html('#twocats');
          should.equal(browserFr.cookies().get('locale'), 'fr');
          should.equal(textFr, '<span id="text">Texte à tester</span>');
          should.equal(textOneCat, '<span id="onecat">1 chat</span>');
          should.equal(textTwoCats, '<span id="twocats">2 chats</span>');
          return cb();
        });
      }, 200);
    }], done);
  });
};

describe('Using i18n in express 3.x with hbs 2.1.0 template engine', function () {
  describe('non concurrent template rendering in different languages', function () {
    return visitLinks('series');
  });
  describe('concurrent template rendering in different languages', function () {
    return visitLinks('parallel');
  });
});
