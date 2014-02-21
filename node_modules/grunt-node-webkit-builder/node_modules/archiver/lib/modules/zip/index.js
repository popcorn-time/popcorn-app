/**
 * node-archiver
 *
 * Copyright (c) 2012-2014 Chris Talkington, contributors.
 * Licensed under the MIT license.
 * https://github.com/ctalkington/node-archiver/blob/master/LICENSE-MIT
 */
var inherits = require('util').inherits;
var Transform = require('stream').Transform || require('readable-stream').Transform;

var engine = require('zip-stream');
var util = require('../../util');

var Zip = module.exports = function(options) {
  options = this.options = util.defaults(options, {
    comment: '',
    forceUTC: false
  });

  if (typeof options.zlib !== 'object') {
    options.zlib = {};
  }

  if (typeof options.level === 'number' && options.level >= 0) {
    options.zlib.level = options.level;
    delete options.level;
  } else if (typeof options.zlib.level !== 'number') {
    options.zlib.level = 1;
  }

  this.engine = new engine(options);
};

Zip.prototype.append = function(source, data, callback) {
  this.engine.entry(source, data, callback);
};

Zip.prototype.finalize = function() {
  this.engine.finalize();
};

Zip.prototype.pipe = function(dest, pipeOpts) {
  return this.engine.pipe(dest, pipeOpts);
};