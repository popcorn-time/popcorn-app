/**
 * node-zip-stream
 *
 * Copyright (c) 2014 Chris Talkington, contributors.
 * Licensed under the MIT license.
 * https://github.com/ctalkington/node-zip-stream/blob/master/LICENSE-MIT
 */
var inherits = require('util').inherits;
var Transform = require('stream').Transform || require('readable-stream').Transform;
var PassThrough = require('stream').PassThrough || require('readable-stream').PassThrough;

var ChecksumStream = require('./util/ChecksumStream');
var DeflateRawChecksum = require('./util/DeflateRawChecksum');
var headers = require('./headers');
var util = require('./util');

var ZipStream = module.exports = function(options) {
  if (!(this instanceof ZipStream)) {
    return new ZipStream(opts);
  }

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

  Transform.call(this, options);

  this.offset = 0;
  this.files = [];

  this._finalize = false;
  this._finalized = false;
  this._processing = false;
};

inherits(ZipStream, Transform);

ZipStream.prototype._afterAppend = function(file) {
  this.files.push(file);
  this._processing = false;

  if (this._finalize) {
    this.finalize();
  }
};

ZipStream.prototype._appendBuffer = function(source, data, callback) {
  var self = this;

  var file = data;
  file.offset = self.offset;

  self.write(headers.encode('file', file));

  function onend() {
    self.write(headers.encode('fileDescriptor', file));

    self._afterAppend(file);

    callback(null);
  }

  if (file.store || source.length === 0) {
    file.uncompressedSize = source.length;
    file.compressedSize = file.uncompressedSize;
    file.crc32 = util.crc32(source).digest();

    self.write(source);

    onend();
  } else {
    var processStream = self._newProcessStream(file.store);
    processStream.once('error', callback);

    processStream.once('end', function() {
      file.crc32 = processStream.digest;
      file.uncompressedSize = processStream.rawSize;
      file.compressedSize = processStream.compressedSize || processStream.rawSize;

      onend();
    });

    processStream.pipe(self, { end: false });

    processStream.end(source);
  }
};

ZipStream.prototype._appendStream = function(source, data, callback) {
  var self = this;

  var file = data;
  file.offset = self.offset;

  self.write(headers.encode('file', file));

  function onend() {
    self.write(headers.encode('fileDescriptor', file));

    self._afterAppend(file);

    callback(null);
  }

  var processStream = self._newProcessStream(file.store);
  processStream.once('error', callback);

  processStream.once('end', function() {
    file.crc32 = processStream.digest;
    file.uncompressedSize = processStream.rawSize;
    file.compressedSize = processStream.compressedSize || processStream.rawSize;

    onend();
  });

  processStream.pipe(self, { end: false });

  source.pipe(processStream);
};

ZipStream.prototype._emitErrorCallback = function(err, data) {
  if (err) {
    this.emit('error', err);
  }
};

ZipStream.prototype._newProcessStream = function(store) {
  var process;

  if (store) {
    process = new ChecksumStream();
  } else {
    process = new DeflateRawChecksum(this.options.zlib);
  }

  return process;
};

ZipStream.prototype._normalizeFileData = function(data) {
  data = util.defaults(data, {
    type: 'file',
    name: null,
    date: null,
    store: false,
    comment: ''
  });

  if (data.name) {
    data.name = util.sanitizePath(data.name);
  }

  if (typeof data.lastModifiedDate !== 'number') {
    data.lastModifiedDate = util.dosDateTime(data.date, this.options.forceUTC);
  }

  if (this.options.zlib && this.options.zlib.level === 0) {
    data.store = true;
  }

  data.flags = (1 << 3);
  data.compressionMethod = data.store ? 0 : 8;
  data.uncompressedSize = 0;
  data.compressedSize = 0;

  return data;
};

ZipStream.prototype._normalizeSource = function(source) {
  if (typeof source === 'string') {
    return new Buffer(source);
  } else if (util.isStream(source) && !source._readableState) {
    var normalized = new PassThrough();
    source.pipe(normalized);

    return normalized;
  }

  return source;
};

ZipStream.prototype._transform = function(chunk, encoding, callback) {
  callback(null, chunk);
};

ZipStream.prototype._writeCentralDirectory = function() {
  var files = this.files;
  var comment = this.options.comment;
  var cdoffset = this.offset;
  var cdsize = 0;

  var centralDirectoryBuffer;
  for (var i = 0; i < files.length; i++) {
    var file = files[i];

    centralDirectoryBuffer = headers.encode('centralDirectory', file);
    this.write(centralDirectoryBuffer);
    cdsize += centralDirectoryBuffer.length;
  }

  var centralDirectoryFooterData = {
    directoryRecordsDisk: files.length,
    directoryRecords: files.length,
    centralDirectorySize: cdsize,
    centralDirectoryOffset: cdoffset,
    comment: comment
  };

  this.write(headers.encode('centralFooter', centralDirectoryFooterData));
};

ZipStream.prototype.entry = function(source, data, callback) {
  if (typeof callback !== 'function') {
    callback = this._emitErrorCallback.bind(this);
  }

  if (this._processing) {
    callback(new Error('already processing an entry'));
    return;
  }

  if (this._finalize || this._finalized) {
    callback(new Error('entry after finalize()'));
    return;
  }

  data = this._normalizeFileData(data);

  if (data.type !== 'file') {
    callback(new Error('only "file" entries are currently supported'));
    return;
  }

  if (typeof data.name !== 'string' || data.name.length === 0) {
    callback(new Error('filename must be a non-empty string value'));
    return;
  }

  this._processing = true;
  source = this._normalizeSource(source);

  if (Buffer.isBuffer(source)) {
    this._appendBuffer(source, data, callback);
  } else if (util.isStream(source)) {
    this._appendStream(source, data, callback);
  } else {
    this._processing = false;
    callback(new Error('input source must be valid Stream or Buffer instance'));
    return;
  }
};

ZipStream.prototype.finalize = function() {
  if (this._processing) {
    this._finalize = true;
    return;
  }

  this._writeCentralDirectory();
  this._finalized = true;
  this.end();
};

ZipStream.prototype.write = function(chunk, cb) {
  if (chunk) {
    this.offset += chunk.length;
  }

  return Transform.prototype.write.call(this, chunk, cb);
};