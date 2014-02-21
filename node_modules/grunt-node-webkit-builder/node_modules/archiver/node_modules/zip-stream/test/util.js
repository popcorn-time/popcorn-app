/*global before,describe,it */
var fs = require('fs');
var assert = require('chai').assert;

var helpers = require('./helpers');
var utils = require('../lib/util');

var BinaryStream = helpers.BinaryStream;
var ChecksumStream = require('../lib/util/ChecksumStream');
var DeadEndStream = helpers.DeadEndStream;
var DeflateRawChecksum = require('../lib/util/DeflateRawChecksum');

var testDateString = 'Jan 03 2013 14:26:38 GMT';
var testDate = new Date(testDateString);
var testDateDosUTC = 1109619539;

var testTimezoneOffset = testDate.getTimezoneOffset();

describe('utils', function() {

  describe('ChecksumStream', function() {
    it('should checksum data while transforming data', function(done) {
      var binary = new BinaryStream(20000);
      var checksum = new ChecksumStream();
      var deadend = new DeadEndStream();

      checksum.on('end', function() {
        assert.equal(checksum.digest, -270675091);

        done();
      });

      checksum.pipe(deadend);
      binary.pipe(checksum);
    });

    it('should calculate data size while transforming data', function(done) {
      var binary = new BinaryStream(20000);
      var checksum = new ChecksumStream();
      var deadend = new DeadEndStream();

      checksum.on('end', function() {
        assert.equal(checksum.rawSize, 20000);

        done();
      });

      checksum.pipe(deadend);
      binary.pipe(checksum);
    });
  });

  describe('crc32', function() {

    describe('crc32(data)', function() {
      it('should initialize CRC32 instance based on data', function() {
        var actual = utils.crc32('testing checksum');

        assert.equal(actual.crc, 323269802);
      });
    });

    describe('#update(data)', function() {
      it('should update CRC32 based on data', function() {
        var actual = utils.crc32().update('testing checksum');

        assert.equal(actual.crc, 323269802);
      });
    });

    describe('#digest()', function() {
      it('should return digest of CRC32', function() {
        var actual = utils.crc32().update('testing checksum').digest();

        assert.equal(actual, -323269803);
      });
    });

  });

  describe('dateify(dateish)', function() {
    it('should return an instance of Date', function() {
      assert.instanceOf(utils.dateify(testDate), Date);
      assert.instanceOf(utils.dateify(testDateString), Date);
      assert.instanceOf(utils.dateify(null), Date);
    });

    it('should passthrough an instance of Date', function() {
      assert.deepEqual(utils.dateify(testDate), testDate);
    });

    it('should convert dateish string to an instance of Date', function() {
      assert.deepEqual(utils.dateify(testDateString), testDate);
    });
  });

  describe('defaults(object, source, guard)', function() {
    it('should default when object key is missing', function() {
      var actual = utils.defaults({ value1: true }, {
        value2: true
      });

      assert.deepEqual(actual, {
        value1: true,
        value2: true
      });
    });
  });

  describe('dosDateTime(date, utc)', function() {
    it('should convert date into its DOS representation', function() {
      assert.equal(utils.dosDateTime(testDate, true), testDateDosUTC);
    });
  });

  describe('isStream(source)', function() {
    it('should return true if source is a stream', function() {
      assert.ok(utils.isStream(new DeadEndStream()));
    });
  });

  describe('sanitizePath(filepath)', function() {
    it('should sanitize filepath', function() {
      assert.equal(utils.sanitizePath('\\this/path//file.txt'), 'this/path/file.txt');
      assert.equal(utils.sanitizePath('/this/path/file.txt'), 'this/path/file.txt');
      assert.equal(utils.sanitizePath('c:\\this\\path\\file.txt'), 'c/this/path/file.txt');
    });
  });

  describe('unixifyPath(filepath)', function() {
    it('should unixify filepath', function() {
      assert.equal(utils.unixifyPath('this\\path\\file.txt'), 'this/path/file.txt');
    });
  });

});