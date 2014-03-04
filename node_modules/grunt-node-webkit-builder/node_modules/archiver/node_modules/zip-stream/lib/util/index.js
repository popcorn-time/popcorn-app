/**
 * node-zip-stream
 *
 * Copyright (c) 2014 Chris Talkington, contributors.
 * Licensed under the MIT license.
 * https://github.com/ctalkington/node-zip-stream/blob/master/LICENSE-MIT
 */
var fs = require('fs');
var path = require('path');
var stream = require('stream');

var loDefaults = require('lodash.defaults');

var util = module.exports = {};

util.crc32 = require('./crc32');

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

  return loDefaults.apply(null, args);
};

util.dosDateTime = function(d, utc) {
  d = (d instanceof Date) ? d : util.dateify(d);
  utc = utc || false;

  var year = utc ? d.getUTCFullYear() : d.getFullYear();

  if (year < 1980) {
    return (1<<21) | (1<<16);
  }

  var val = {
    year: year,
    month: utc ? d.getUTCMonth() : d.getMonth(),
    date: utc ? d.getUTCDate() : d.getDate(),
    hours: utc ? d.getUTCHours() : d.getHours(),
    minutes: utc ? d.getUTCMinutes() : d.getMinutes(),
    seconds: utc ? d.getUTCSeconds() : d.getSeconds()
  };

  return ((val.year-1980) << 25) | ((val.month+1) << 21) | (val.date << 16) |
    (val.hours << 11) | (val.minutes << 5) | (val.seconds / 2);
};

util.isStream = function(source) {
  return (source instanceof stream.Stream);
};

util.sanitizePath = function() {
  var filepath = path.join.apply(path, arguments);
  return filepath.replace(/\\/g, '/').replace(/:/g, '').replace(/^\/+/, '');
};

util.unixifyPath = function() {
  var filepath = path.join.apply(path, arguments);
  return filepath.replace(/\\/g, '/');
};