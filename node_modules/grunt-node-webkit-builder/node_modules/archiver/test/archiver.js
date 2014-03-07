/*global before,describe,it */
var fs = require('fs');
var PassThrough = require('stream').PassThrough || require('readable-stream/passthrough');
var WriteStream = fs.createWriteStream;

var assert = require('chai').assert;
var mkdir = require('mkdirp');

var common = require('./helpers/common');
var HashStream = common.HashStream;
var UnBufferedStream = common.UnBufferedStream;
var WriteHashStream = common.WriteHashStream;
var binaryBuffer = common.binaryBuffer;

var archiver = require('../lib/archiver');

var testDate = new Date('Jan 03 2013 14:26:38 GMT');
var testDate2 = new Date('Feb 10 2013 10:24:42 GMT');

describe('archiver', function() {

  before(function() {
    mkdir.sync('tmp');
  });


  describe('Archiver', function() {
    var ArchiverCore = require('../lib/modules/core');

    describe('#_normalizeSource(source)', function() {
      var core = new ArchiverCore();

      it('should normalize strings to an instanceOf Buffer', function() {
        var normalized = core._normalizeSource('some string');

        assert.instanceOf(normalized, Buffer);
      });

      it('should normalize older unbuffered streams', function() {
        var noBufferStream = new UnBufferedStream();
        var normalized = core._normalizeSource(noBufferStream);

        assert.instanceOf(normalized, PassThrough);
      });
    });

  });


  describe('core', function() {

    describe('#file', function() {
      var actual;

      before(function(done) {
        var archive = archiver('json');
        var testStream = new WriteStream('tmp/file.json');

        testStream.on('close', function() {
          actual = common.readJSON('tmp/file.json');
          done();
        });

        archive.pipe(testStream);

        archive
          .file('test/fixtures/test.txt', { name: 'test.txt', date: testDate })
          .file('test/fixtures/test.txt')
          .finalize();
      });

      it('should append filepath', function() {
        assert.isArray(actual);
        assert.propertyVal(actual[0], 'name', 'test.txt');
        assert.propertyVal(actual[0], 'date', '2013-01-03T14:26:38.000Z');
        assert.propertyVal(actual[0], 'crc32', 585446183);
        assert.propertyVal(actual[0], 'size', 19);
      });

      it('should fallback to filepath when no name is set', function() {
        assert.isArray(actual);
        assert.propertyVal(actual[1], 'name', 'test/fixtures/test.txt');
      });
    });

    describe('#bulk', function() {
      var actual;

      before(function(done) {
        var archive = archiver('json');
        var testStream = new WriteStream('tmp/bulk.json');

        testStream.on('close', function() {
          actual = common.readJSON('tmp/bulk.json');
          done();
        });

        archive.pipe(testStream);

        archive
          .bulk([
            { expand: true, cwd: 'test/fixtures', src: 'directory/**' }
          ])
          .finalize();
      });

      it('should append multiple files', function() {
        assert.isArray(actual);
        assert.lengthOf(actual, 3);
      });
    });

  });


  describe('tar', function() {

    describe('#append', function() {
      it('should append Buffer sources', function(done) {
        var archive = archiver('tar');
        var testStream = new WriteHashStream('tmp/buffer.tar');

        testStream.on('close', function() {
          assert.equal(testStream.digest, 'bc84fec33e7a4f6c8777cabd0beba503a7bce331');
          done();
        });

        archive.pipe(testStream);

        archive
          .append(binaryBuffer(20000), { name: 'buffer.txt', date: testDate })
          .finalize();
      });

      it('should append Stream sources', function(done) {
        var archive = archiver('tar');
        var testStream = new WriteHashStream('tmp/stream.tar');

        testStream.on('close', function() {
          assert.equal(testStream.digest, 'b3bf662968c87989431a25b2f699eae213392e82');
          done();
        });

        archive.pipe(testStream);

        archive
          .append(fs.createReadStream('test/fixtures/test.txt'), { name: 'stream.txt', date: testDate })
          .finalize();
      });

      it('should append multiple sources', function(done) {
        var archive = archiver('tar');
        var testStream = new WriteHashStream('tmp/multiple.tar');

        testStream.on('close', function() {
          assert.equal(testStream.digest, '0c4e2a79d0d2c41ae5eb2e1e70d315a617583e4d');
          done();
        });

        archive.pipe(testStream);

        archive
          .append('string', { name: 'string.txt', date: testDate })
          .append(binaryBuffer(20000), { name: 'buffer.txt', date: testDate2 })
          .append(fs.createReadStream('test/fixtures/test.txt'), { name: 'stream.txt', date: testDate })
          .finalize();
      });

      it('should use prefix for deep paths', function(done) {
        var archive = archiver('tar');
        var testStream = new WriteHashStream('tmp/feature-prefix.tar');

        testStream.on('close', function() {
          assert.equal(testStream.digest, 'c1efbfbdc9a49979a6e02b4009003de533fcda48');
          done();
        });

        archive.pipe(testStream);

        var deepPath = 'vvmbtqhysigpregbdrc/pyqaznbelhppibmbykz/';
        deepPath += 'qcbclwjhktiazmhnsjt/kpsgdfyfkarbvnlinrt/';
        deepPath += 'holobndxfccyecblhcc/';
        deepPath += deepPath;

        archive
          .append('deep path', { name: deepPath + 'file.txt', date: testDate })
          .finalize();
      });

      it('should append zero length sources', function(done) {
        var archive = archiver('tar');
        var testStream = new WriteHashStream('tmp/zerolength.tar');

        testStream.on('close', function() {
          assert.equal(testStream.digest, 'f4f7b53f8ee4c7124298695bffbacfa9e9c0a99f');
          done();
        });

        archive.pipe(testStream);

        archive
          .append('', { name: 'string.txt', date: testDate })
          .append(new Buffer(0), { name: 'buffer.txt', date: testDate })
          .append(fs.createReadStream('test/fixtures/empty.txt'), { name: 'stream.txt', date: testDate })
          .finalize();
      });
    });

  });

});