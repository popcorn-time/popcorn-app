/*global before,describe,it */
var fs = require('fs');

var assert = require('chai').assert;
var mkdir = require('mkdirp');

var helpers = require('./helpers');
var binaryBuffer = helpers.binaryBuffer;
var WriteHashStream = helpers.WriteHashStream;

var packer = require('../lib/zip-stream.js');

var testDate = new Date('Jan 03 2013 14:26:38 GMT');
var testDate2 = new Date('Feb 10 2013 10:24:42 GMT');

describe('pack', function() {
  before(function() {
    mkdir.sync('tmp');
  });

  describe('#entry', function() {

    it('should append Buffer sources', function(done) {
      var archive = new packer({
        forceUTC: true
      });

      var testStream = new WriteHashStream('tmp/buffer.zip');

      testStream.on('close', function() {
        assert.equal(testStream.digest, 'f717caf8928848bb90963dfaae3f4794907ec9a3');
        done();
      });

      archive.pipe(testStream);

      archive.entry(binaryBuffer(20000), { name: 'buffer.txt', date: testDate });
      archive.finalize();
    });

    it('should append Stream sources', function(done) {
      var archive = new packer({
        forceUTC: true
      });

      var testStream = new WriteHashStream('tmp/stream.zip');

      testStream.on('close', function() {
        assert.equal(testStream.digest, '696d847c779cb4ad77c52de4dcb5995fabe82053');
        done();
      });

      archive.pipe(testStream);

      archive.entry(fs.createReadStream('test/fixtures/test.txt'), { name: 'stream.txt', date: testDate });
      archive.finalize();
    });

    it('should append multiple sources', function(done) {
      var archive = new packer({
        forceUTC: true
      });

      var testStream = new WriteHashStream('tmp/multiple.zip');

      testStream.on('close', function() {
        assert.equal(testStream.digest, '404d35e59ee6d510774445cd8710bf37e1303aae');
        done();
      });

      archive.pipe(testStream);

      archive.entry('string', { name: 'string.txt', date: testDate }, function(err) {
        if (err) throw err;
        archive.entry(binaryBuffer(20000), { name: 'buffer.txt', date: testDate2 }, function(err) {
          if (err) throw err;
          archive.entry(fs.createReadStream('test/fixtures/test.txt'), { name: 'stream.txt', date: testDate2 }, function(err) {
            if (err) throw err;
            archive.entry(fs.createReadStream('test/fixtures/test.txt'), { name: 'stream-store.txt', date: testDate, store: true }, function(err) {
              if (err) throw err;
              archive.finalize();
            });
          });
        });
      });
    });

    it('should support STORE for Buffer sources', function(done) {
      var archive = new packer({
        forceUTC: true
      });

      var testStream = new WriteHashStream('tmp/buffer-store.zip');

      testStream.on('close', function() {
        assert.equal(testStream.digest, 'a8b0fdf44cc200f4b5e5361e0e4e59c8cf136c85');
        done();
      });

      archive.pipe(testStream);

      archive.entry(binaryBuffer(20000), { name: 'buffer.txt', date: testDate, store: true });
      archive.finalize();
    });

    it('should support STORE for Stream sources', function(done) {
      var archive = new packer({
        forceUTC: true
      });

      var testStream = new WriteHashStream('tmp/stream-store.zip');

      testStream.on('close', function() {
        assert.equal(testStream.digest, '0afeba5761199501ae58c3670713761b4d42bc3a');
        done();
      });

      archive.pipe(testStream);

      archive.entry(fs.createReadStream('test/fixtures/test.txt'), { name: 'stream.txt', date: testDate, store: true });
      archive.finalize();
    });

    it('should support archive and file comments', function(done) {
      var archive = new packer({
        comment: 'this is a zip comment',
        forceUTC: true
      });

      var testStream = new WriteHashStream('tmp/comments.zip');

      testStream.on('close', function() {
        assert.equal(testStream.digest, '2fad5e4b36b5030a36e218273c1b6cb94c238208');
        done();
      });

      archive.pipe(testStream);

      archive.entry(binaryBuffer(20000), { name: 'buffer.txt', date: testDate, comment: 'this is a file comment' });
      archive.finalize();
    });

    it('should STORE files when compression level is zero', function(done) {
      var archive = new packer({
        forceUTC: true,
        level: 0
      });

      var testStream = new WriteHashStream('tmp/store-level0.zip');

      testStream.on('close', function() {
        assert.equal(testStream.digest, 'a8b0fdf44cc200f4b5e5361e0e4e59c8cf136c85');
        done();
      });

      archive.pipe(testStream);

      archive.entry(binaryBuffer(20000), { name: 'buffer.txt', date: testDate });
      archive.finalize();
    });

    it('should properly handle utf8 encoded characters in file names and comments', function(done) {
      var archive = new packer({
        forceUTC: true
      });

      var testStream = new WriteHashStream('tmp/accentedchars-filenames.zip');

      testStream.on('close', function() {
        assert.equal(testStream.digest, '78983b5596afa4a7844e0fb16ba8adcdaecfa4fd');
        done();
      });

      archive.pipe(testStream);

      archive.entry(binaryBuffer(20000), { name: 'àáâãäçèéêëìíîïñòóôõöùúûüýÿ.txt', date: testDate, comment: 'àáâãäçèéêëìíîïñòóôõöùúûüýÿ' }, function(err) {
        if (err) throw err;
        archive.entry(binaryBuffer(20000), { name: 'ÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ.txt', date: testDate2, comment: 'ÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ' }, function(err) {
          if (err) throw err;
          archive.finalize();
        });
      });
    });

    it('should append zero length sources', function(done) {
      var archive = new packer({
        forceUTC: true
      });

      var testStream = new WriteHashStream('tmp/zerolength.zip');

      testStream.on('close', function() {
        assert.equal(testStream.digest, '61ac99936f7dc99f38fbaa3789050b6b14900e47');
        done();
      });

      archive.pipe(testStream);

      archive.entry('', { name: 'string.txt', date: testDate }, function(err) {
        if (err) throw err;
        archive.entry(new Buffer(0), { name: 'buffer.txt', date: testDate }, function(err) {
          if (err) throw err;
          archive.entry(fs.createReadStream('test/fixtures/empty.txt'), { name: 'stream.txt', date: testDate }, function(err) {
            archive.finalize();
          });
        });
      });
    });

    it('should support setting file mode (permissions)', function(done) {
      var archive = new packer({
        forceUTC: true
      });

      var testStream = new WriteHashStream('tmp/filemode.zip');

      testStream.on('close', function() {
        assert.equal(testStream.digest, '41da8a79fb25b46b594105eb8618b6ebb0ed3135');
        done();
      });

      archive.pipe(testStream);

      archive.entry(binaryBuffer(20000), { name: 'buffer.txt', date: testDate, mode: 0644 });
      archive.finalize();
    });

    it('should support creating an empty zip', function(done) {
      var archive = new packer({
        forceUTC: true
      });

      var testStream = new WriteHashStream('tmp/empty.zip');

      testStream.on('close', function() {
        assert.equal(testStream.digest, 'b04f3ee8f5e43fa3b162981b50bb72fe1acabb33');
        done();
      });

      archive.pipe(testStream);

      archive.finalize();
    });

  });

});