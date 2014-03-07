/**
 * node-zip-stream
 *
 * Copyright (c) 2014 Chris Talkington, contributors.
 * Licensed under the MIT license.
 * https://github.com/ctalkington/node-zip-stream/blob/master/LICENSE-MIT
 */
var inherits = require('util').inherits;
var Transform = require('stream').Transform || require('readable-stream').Transform;

var util = require('./');

function ChecksumStream(options) {
  Transform.call(this, options);

  this.checksum = util.crc32();
  this.digest = null;

  this.rawSize = 0;
}

inherits(ChecksumStream, Transform);

ChecksumStream.prototype._transform = function(chunk, encoding, callback) {
  if (chunk) {
    this.checksum.update(chunk);
    this.rawSize += chunk.length;
  }

  callback(null, chunk);
};

ChecksumStream.prototype._flush = function(callback) {
  this.digest = this.checksum.digest();

  callback();
};

module.exports = ChecksumStream;