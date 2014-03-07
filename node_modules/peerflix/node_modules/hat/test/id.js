var hat = require('../');
var assert = require('assert');

function digits (bits, base) {
    return Math.ceil(
        Math.log(parseInt(Array(bits + 1).join('1'), 2)
    ) / Math.log(base));
}

exports.lengths = function () {
    for (var i = 0; i < 10; i++) {
        assert.equal(hat(4).length, 1);
    }
    
    for (var i = 0; i < 10; i++) {
        assert.equal(hat(3).length, 1);
    }
    
    (function () {
        var d = digits(32, 16);
        for (var i = 0; i < 10; i++) {
            assert.equal(hat(32, 16).length, d);
            assert.equal(hat(33, 16).length, d + 1);
        }
    })();
};

exports.range = function () {
    for (var base = 2; base < 32; base++) {
        for (var bits = 0; bits < 256; bits += base) {
            for (var k = 0; k < 10; k++) {
                var id = hat(bits, base);
                var iid = parseInt(id, base);
                assert.ok(iid >= 0);
                assert.ok(iid < Math.pow(2, bits));
            }
        }
    }
};

exports.big = function () {
    var id = hat(1024);
    assert.equal(id.length, 256);
};

exports.bigger = function () {
    var id = hat(2048);
    assert.equal(id.length, 512);
};
