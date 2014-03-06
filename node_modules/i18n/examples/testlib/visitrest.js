var async = require('async'),
    should = require('should');

module.exports = visitRest;

function visitRest(asyncMethod, url, EN, textEN, DE, textDE, responseVariable) {
  return it('should show ' + textEN + ' in EN and ' + textDE + ' in DE', function (done) {
    return async[asyncMethod]([

    function (cb) {
      return EN.visit('http://localhost:3000/' + url + '?delay=1000', function () {
        var payload = JSON.parse(EN.text('body'));
        should.exist(payload);
        should.exist(payload[responseVariable]);
        payload[responseVariable].should.equal(textEN);
        return cb();
      });
    },

    function (cb) {
      return setTimeout(function () {
        return DE.visit('http://localhost:3000/' + url , function () {
          var payload = JSON.parse(DE.text('body'));
          should.exist(payload);
          should.exist(payload[responseVariable]);
          payload[responseVariable].should.equal(textDE);
          return cb();
        });
      }, 200);
    }

    ],

    done);

  });
}
