/**
 * node-archiver
 *
 * Copyright (c) 2012-2014 Chris Talkington, contributors.
 * Licensed under the MIT license.
 * https://github.com/ctalkington/node-archiver/blob/master/LICENSE-MIT
 */
var fs = require('fs');
var path = require('path');
var stream = require('stream');

var util = module.exports = {};

util._ = require('lodash');
util.crc32 = require('./crc32');
util.lazystream = require('lazystream');
util.file = require('file-utils');

util.cleanBuffer = function(length) {
  var buf = new Buffer(length);

  buf.fill(0);

  return buf;
};

util.collectStream = function(source, callback) {
  var collection = [];
  var size = 0;

  source.on('error', callback);

  source.on('data', function(chunk) {
    collection.push(chunk);
    size += chunk.length;
  });

  source.on('end', function() {
    var buf = new Buffer(size, 'utf8');
    var offset = 0;

    collection.forEach(function(data) {
      data.copy(buf, offset);
      offset += data.length;
    });

    callback(null, buf);
  });
};

util.convertDateTimeEpoch = function(input) {
  input = input * 1000;

  return new Date(input);
};

util.convertDateTimeOctal = function(input) {
  input = parseInt(input, 8) * 1000;

  return new Date(input);
};

util.dateify = function(dateish) {
  dateish = dateish || new Date();

  if (dateish instanceof Date) {
    dateish = dateish;
  } else if (typeof dateish === 'string') {
    dateish = new Date(dateish);
  } else {
    dateish = new Date();
  }

  return dateish;
};

// this is slightly different from lodash version
util.defaults = function(object, source, guard) {
  var args = arguments;
  args[0] = args[0] || {};

  return util._.defaults.apply(util._, args);
};

util.epochDateTime = function(d) {
  d = (d instanceof Date) ? d : new Date();

  return Math.round(d / 1000);
};

util.isStream = function(source) {
  return (source instanceof stream.Stream);
};

util.lazyReadStream = function(filepath) {
  return new util.lazystream.Readable(function() {
    return fs.createReadStream(filepath);
  });
};

// reusing bits of grunt's multi-task source normalization
util.normalizeFilesArray = function(data) {
  var files = [];

  data.forEach(function(obj) {
    var prop;
    if ('src' in obj || 'dest' in obj) {
      files.push(obj);
    }
  });

  if (files.length === 0) {
    return [];
  }

  files = util._(files).chain().forEach(function(obj) {
    if (!('src' in obj) || !obj.src) { return; }
    // Normalize .src properties to flattened array.
    if (Array.isArray(obj.src)) {
      obj.src = util._.flatten(obj.src);
    } else {
      obj.src = [obj.src];
    }
  }).map(function(obj) {
    // Build options object, removing unwanted properties.
    var expandOptions = util._.extend({}, obj);
    delete expandOptions.src;
    delete expandOptions.dest;

    // Expand file mappings.
    if (obj.expand) {
      return util.file.expandMapping(obj.src, obj.dest, expandOptions).map(function(mapObj) {
        // Copy obj properties to result.
        var result = util._.extend({}, obj);
        // Make a clone of the orig obj available.
        result.orig = util._.extend({}, obj);
        // Set .src and .dest, processing both as templates.
        result.src = mapObj.src;
        result.dest = mapObj.dest;
        // Remove unwanted properties.
        ['expand', 'cwd', 'flatten', 'rename', 'ext'].forEach(function(prop) {
          delete result[prop];
        });
        return result;
      });
    }

    // Copy obj properties to result, adding an .orig property.
    var result = util._.extend({}, obj);
    // Make a clone of the orig obj available.
    result.orig = util._.extend({}, obj);

    if ('src' in result) {
      // Expose an expand-on-demand getter method as .src.
      Object.defineProperty(result, 'src', {
        enumerable: true,
        get: function fn() {
          var src;
          if (!('result' in fn)) {
            src = obj.src;
            // If src is an array, flatten it. Otherwise, make it into an array.
            src = Array.isArray(src) ? util._.flatten(src) : [src];
            // Expand src files, memoizing result.
            fn.result = util.file.expand(expandOptions, src);
          }
          return fn.result;
        }
      });
    }

    if ('dest' in result) {
      result.dest = obj.dest;
    }

    return result;
  }).flatten().value();

  return files;
};

util.octalDateTime = function(d) {
  d = (d instanceof Date) ? d : new Date();

  return Math.round(d / 1000).toString(8);
};

util.padNumber = function(num, bytes, base) {
  num = num.toString(base || 8);
  return util.repeat('0', bytes - num.length) + num;
};

util.repeat = function(pattern, count) {
  if (count < 1) {
    return '';
  }

  var result = '';

  while (count > 0) {
    if (count & 1) {
      result += pattern;
    }

    count >>= 1;
    pattern += pattern;
  }

  return result;
};

util.sanitizePath = function() {
  var filepath = path.join.apply(path, arguments);
  return filepath.replace(/\\/g, '/').replace(/:/g, '').replace(/^\/+/, '');
};

util.scanBuffer = function(buf, search, offset) {
  if (!Buffer.isBuffer(buf)) {
    return false;
  }

  var origBufLength = buf.length;
  var negative = false;
  var wasOffset = false;

  if (offset) {
    if (offset < 0) {
      offset = offset * -1;
      negative = true;
    }

    if (offset <= origBufLength) {
      if (negative) {
        offset = offset * -1;
      }

      wasOffset = true;
      buf = buf.slice(offset);
    }
  }

  if (typeof search === 'string') {
    search = new Buffer(search);
  } else if (!Buffer.isBuffer(search)) {
    return false;
  }

  // simple but slow string search
  for (var i = 0; i <= buf.length - search.length + 1; i++) {
    for (var j = 0; j < search.length && buf[i + j] === search[j]; j++);
    if (j === search.length) {
      if (wasOffset) {
        return origBufLength - (buf.length - i);
      }

      return i;
    }
  }

  return false;
};

util.scanBufferUInt32LE = function(buf, search, offset) {
  if (!search) {
    return false;
  }

  var searchBuf = new Buffer(4);
  searchBuf.writeUInt32LE(search, 0);

  return util.scanBuffer(buf, searchBuf, offset);
};

util.unixifyPath = function() {
  var filepath = path.join.apply(path, arguments);
  return filepath.replace(/\\/g, '/');
};