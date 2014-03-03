var async = require('async'),
    should = require('should');

module.exports = visitLinks;

function visitLinks(asyncMethod, url, EN, textEN, DE, textDE) {
  return it('should show ' + textEN + ' in EN and ' + textDE + ' in DE', function (done) {
    return async[asyncMethod]([

    function (cb) {

      return EN.visit('http://localhost:3000/' + url + '/?delay=1000', function () {
        EN.text('body').should.equal(textEN);
        return cb();
      });

    },

    function (cb) {
      return setTimeout(function () {

        return DE.visit('http://localhost:3000/' + url + '/', function () {
          DE.text('body').should.equal(textDE);
          return cb();
        });

      }, 200);
    }

    ],

    done);

  });
}
