/**
 * node-zip-stream
 *
 * Copyright (c) 2014 Chris Talkington, contributors.
 * Licensed under the MIT license.
 * https://github.com/ctalkington/node-zip-stream/blob/master/LICENSE-MIT
 */
var inherits = require('util').inherits;

var DEFAULT_FILE_MODE = 0100664;
var DEFAULT_DIR_MODE = 040755;
var BASE_FILE_MODE = 0100000;
var BASE_DIR_MODE = 040000;

function ZipHeader() {
  this.bufferSize = 0;
  this.fields = [];
}

ZipHeader.prototype.toBuffer = function(data) {
  var buf = new Buffer(this.bufferSize);
  var offset = 0;
  var val;
  var fallback;

  data = this._normalize(data);

  this.fields.forEach(function(value) {
    fallback = (value.type === 'string') ? '' : 0;
    val = data[value.field] || value.def || fallback;

    var noAssert = false;

    if (value.field === 'externalFileAttributes') {
      noAssert = true;
    }

    if (value.lenField) {
      value.len = (data[value.lenField] > 0) ? buf.write(val, offset) : 0;
    } else if (typeof buf['write' + value.type] === 'function') {
      buf['write' + value.type](val, offset, noAssert);
    } else if (val.length > 0) {
      buf.write(val, offset);
    }

    offset += value.len;
  });

  return buf.slice(0, offset);
};

ZipHeader.prototype.toObject = function(buf) {
  var data = {};
  var offset = 0;

  this.fields.forEach(function(value) {
    if (value.lenField) {
      data[value.field] = (data[value.lenField] > 0) ? buf.toString('utf8', offset) : null;
    } else if (typeof buf['read' + value.type] === 'function') {
      data[value.field] = buf['read' + value.type](offset);
    } else {
      data[value.field] = buf.toString(null, offset, value.len);
    }

    offset += value.len;
  });

  return data;
};

ZipHeader.prototype._normalize = function(data) {
  // Don't always set mode as this is a experimental feature
  // if (!data.mode) {
  //   data.mode = DEFAULT_FILE_MODE;
  // }

  if (data.name) {
    if (Buffer.byteLength(data.name) !== data.name.length) {
      data.flags |= (1 << 11);
    }

    data.filenameLength = Buffer.byteLength(data.name);
  }

  if (data.comment) {
    if (Buffer.byteLength(data.comment) !== data.comment.length) {
      data.flags |= (1 << 11);
    }

    data.commentLength = Buffer.byteLength(data.comment);
  }

  if (data.extraField) {
    data.extraFieldLength = data.extraField.length;
  }

  if (data.mode) {
    data.mode &= ~BASE_DIR_MODE;
    data.mode |= BASE_FILE_MODE;
    data.externalFileAttributes = (data.mode << 16);
  }

  return data;
};

function ZipHeaderFile() {
  ZipHeader.call(this);

  this.bufferSize = 1024;
  this.fields = [
    {field: 'signature', len: 4, type: 'UInt32LE', def: 0x04034b50},
    {field: 'versionNeededToExtract', len: 2, type: 'UInt16LE', def: 20},
    {field: 'flags', len: 2, type: 'UInt16LE'},
    {field: 'compressionMethod', len: 2, type: 'UInt16LE'},
    {field: 'lastModifiedDate', len: 4, type: 'UInt32LE'},
    {field: 'crc32', len: 4, type: 'Int32LE', def: 0},
    {field: 'compressedSize', len: 4, type: 'UInt32LE'},
    {field: 'uncompressedSize', len: 4, type: 'UInt32LE'},
    {field: 'filenameLength', len: 2, type: 'UInt16LE'},
    {field: 'extraFieldLength', len: 2, type: 'UInt16LE'},
    {field: 'name', len: -1, lenField: 'filenameLength', type: 'string'},
    {field: 'extraField', len: -1, lenField: 'extraFieldLength', type: 'string'}
  ];
}
inherits(ZipHeaderFile, ZipHeader);

function ZipHeaderFileDescriptor() {
  ZipHeader.call(this);

  this.bufferSize = 16;
  this.fields = [
    {field: 'signature', len: 4, type: 'UInt32LE', def: 0x08074b50},
    {field: 'crc32', len: 4, type: 'Int32LE'},
    {field: 'compressedSize', len: 4, type: 'UInt32LE'},
    {field: 'uncompressedSize', len: 4, type: 'UInt32LE'}
  ];
}
inherits(ZipHeaderFileDescriptor, ZipHeader);

function ZipHeaderCentralDirectory() {
  ZipHeader.call(this);

  this.bufferSize = 1024;
  this.fields = [
    {field: 'signature', len: 4, type: 'UInt32LE', def: 0x02014b50},
    {field: 'versionMadeBy', len: 2, type: 'UInt16LE', def: 20},
    {field: 'versionNeededToExtract', len: 2, type: 'UInt16LE', def: 20},
    {field: 'flags', len: 2, type: 'UInt16LE'},
    {field: 'compressionMethod', len: 2, type: 'UInt16LE'},
    {field: 'lastModifiedDate', len: 4, type: 'UInt32LE'},
    {field: 'crc32', len: 4, type: 'Int32LE'},
    {field: 'compressedSize', len: 4, type: 'UInt32LE'},
    {field: 'uncompressedSize', len: 4, type: 'UInt32LE'},
    {field: 'filenameLength', len: 2, type: 'UInt16LE'},
    {field: 'extraFieldLength', len: 2, type: 'UInt16LE'},
    {field: 'commentLength', len: 2, type: 'UInt16LE'},
    {field: 'diskNumberStart', len: 2, type: 'UInt16LE'},
    {field: 'internalFileAttributes', len: 2, type: 'UInt16LE'},
    {field: 'externalFileAttributes', len: 4, type: 'UInt32LE'},
    {field: 'offset', len: 4, type: 'UInt32LE'},
    {field: 'name', len: -1, lenField: 'filenameLength', type: 'string'},
    {field: 'extraField', len: -1, lenField: 'extraFieldLength', type: 'string'},
    {field: 'comment', len: -1, lenField: 'commentLength', type: 'string'}
  ];
}
inherits(ZipHeaderCentralDirectory, ZipHeader);

function ZipHeaderCentralFooter() {
  ZipHeader.call(this);

  this.bufferSize = 512;
  this.fields = [
    {field: 'signature', len: 4, type: 'UInt32LE', def: 0x06054b50},
    {field: 'diskNumber', len: 2, type: 'UInt16LE'},
    {field: 'diskNumberStart', len: 2, type: 'UInt16LE'},
    {field: 'directoryRecordsDisk', len: 2, type: 'UInt16LE'},
    {field: 'directoryRecords', len: 2, type: 'UInt16LE'},
    {field: 'centralDirectorySize', len: 4, type: 'UInt32LE'},
    {field: 'centralDirectoryOffset', len: 4, type: 'UInt32LE'},
    {field: 'commentLength', len: 2, type: 'UInt16LE'},
    {field: 'comment', len: -1, lenField: 'commentLength', type: 'string'}
  ];
}
inherits(ZipHeaderCentralFooter, ZipHeader);

var headers = {
  file: new ZipHeaderFile(),
  fileDescriptor: new ZipHeaderFileDescriptor(),
  centralDirectory: new ZipHeaderCentralDirectory(),
  centralFooter: new ZipHeaderCentralFooter()
};

var encode = exports.encode = function(type, data) {
  if (!headers[type] || typeof headers[type].toBuffer !== 'function') {
    throw new Error('Unknown encode type');
  }

  return headers[type].toBuffer(data);
};

exports.file = ZipHeaderFile;
exports.fileDescriptor = ZipHeaderFileDescriptor;
exports.centralDirectory = ZipHeaderCentralDirectory;
exports.centralFooter = ZipHeaderCentralFooter;