/**
 * node-archiver
 *
 * Copyright (c) 2012-2014 Chris Talkington, contributors.
 * Licensed under the MIT license.
 * https://github.com/ctalkington/node-archiver/blob/master/LICENSE-MIT
 */
var inherits = require('util').inherits;
var Transform = require('stream').Transform || require('readable-stream').Transform;

var util = require('../../util');

var Json = module.exports = function(options) {
  options = this.options = util.defaults(options, {});

  Transform.call(this, options);

  this.files = [];
};

inherits(Json, Transform);

Json.prototype._transform = function(chunk, encoding, callback) {
  callback(null, chunk);
};

Json.prototype._writeStringified = function() {
  var fileString = JSON.stringify(this.files);
  this.write(fileString);
};

Json.prototype.append = function(source, data, callback) {
  var self = this;

  var file = data;
  file.crc32 = null;

  function onend(err, sourceBuffer) {
    if (err) {
      callback(err);
      return;
    }

    sourceBuffer = sourceBuffer || false;
    file.size = sourceBuffer.length || 0;


    if (file.size > 0) {
      file.crc32 = util.crc32(sourceBuffer).digest();
    }

    self.files.push(file);

    callback(null, file);
  }

  if (file.sourceType === 'buffer') {
    onend(null, source);
  } else if (file.sourceType === 'stream') {
    util.collectStream(source, onend);
  }
};

Json.prototype.finalize = function(callback) {
  callback = callback || function() {};

  this._writeStringified();

  this.end();

  callback();
};