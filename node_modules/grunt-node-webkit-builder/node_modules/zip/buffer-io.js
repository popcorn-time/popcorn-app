
var Buffer = require("buffer").Buffer;

exports.BufferIO = function () {
    var self = {};
    var buffers = [];

    // TODO read size
    self.read = function () {
        consolidate(buffers);
        return buffers.shift();
    };

    self.write = function (buffer) {
        buffers.push(new Buffer(buffer));
    };

    self.close = function () {
    };

    self.destroy = function () {
    };

    self.toBuffer = function () {
        consolidate(buffers);
        // for whatever reason, the buffer constructor does
        // not copy buffers in v0.3.3
        var buffer = new Buffer(buffers[0].length);
        buffers[0].copy(buffer);
        return buffer;
    };

    return self;
};

exports.consolidate = consolidate;
function consolidate(buffers) {
    var length = 0;
    var at;
    var i;
    var ii = buffers.length;
    var buffer;
    var result;
    for (i = 0; i < ii; i++) {
        buffer = buffers[i];
        length += buffer.length;
    }
    result = new Buffer(length);
    at = 0;
    for (i = 0; i < ii; i++) {
        buffer = buffers[i];
        buffer.copy(result, at, 0);
        at += buffer.length;
    }
    buffers.splice(0, ii, result);
}

