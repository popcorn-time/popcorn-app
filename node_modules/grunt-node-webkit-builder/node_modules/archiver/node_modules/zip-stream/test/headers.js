/*global before,describe,it */
var fs = require('fs');
var assert = require('chai').assert;

var helpers = require('./helpers');

var headers = require('../lib/headers');

var testDate = new Date('Jan 03 2013 14:26:38 GMT');
var testDateEpoch = 1357223198;

describe('headers', function() {

  describe('zip', function() {
    var fileFixture = fs.readFileSync('test/fixtures/headers/zip-file.bin');
    var fileDescriptorFixture = fs.readFileSync('test/fixtures/headers/zip-filedescriptor.bin');
    var centralDirectoryFixture = fs.readFileSync('test/fixtures/headers/zip-centralheader.bin');
    var centralFooterFixture = fs.readFileSync('test/fixtures/headers/zip-centralfooter.bin');

    describe('#encode(type, object)', function() {

      describe('type->file', function() {
        var actual = headers.encode('file', {
          name: 'test.txt',
          filenameLength: 8,
          date: testDate,
          comment: '',
          store: true,
          lastModifiedDate: 1109619539,
          versionMadeBy: 20,
          versionNeededToExtract: 20,
          flags: 2056,
          compressionMethod: 0,
          uncompressedSize: 0,
          compressedSize: 0,
          offset: 0
        });

        it('should return an instance of Buffer', function() {
          assert.instanceOf(actual, Buffer);
        });

        it('should match provided fixture', function() {
          // fs.writeFileSync('test/fixtures/headers/zip-file.bin', actual);
          assert.deepEqual(actual, fileFixture);
        });
      });

      describe('type->fileDescriptor', function() {
        var actual = headers.encode('fileDescriptor', {
          crc32: 585446183,
          uncompressedSize: 19,
          compressedSize: 19,
        });

        it('should return an instance of Buffer', function() {
          assert.instanceOf(actual, Buffer);
        });

        it('should match provided fixture', function() {
          // fs.writeFileSync('test/fixtures/headers/zip-filedescriptor.bin', actual);
          assert.deepEqual(actual, fileDescriptorFixture);
        });
      });

      describe('type->centralDirectory', function() {
        var actual = headers.encode('centralDirectory', {
          name: 'test.txt',
          filenameLength: 8,
          date: testDate,
          store: true,
          comment: '',
          mode: 0644,
          lastModifiedDate: 1109619539,
          versionMadeBy: 20,
          versionNeededToExtract: 20,
          flags: 2056,
          compressionMethod: 0,
          uncompressedSize: 19,
          compressedSize: 19,
          offset: 0,
          crc32: 585446183
        });

        it('should return an instance of Buffer', function() {
          assert.instanceOf(actual, Buffer);
        });

        it('should match provided fixture', function() {
          // fs.writeFileSync('test/fixtures/headers/zip-centralheader.bin', actual);
          assert.deepEqual(actual, centralDirectoryFixture);
        });
      });

      describe('type->centralFooter', function() {
        var actual = headers.encode('centralFooter', {
          directoryRecordsDisk: 1,
          directoryRecords: 1,
          centralDirectorySize: 56,
          centralDirectoryOffset: 73,
          comment: ''
        });

        it('should return an instance of Buffer', function() {
          assert.instanceOf(actual, Buffer);
        });

        it('should match provided fixture', function() {
          // fs.writeFileSync('test/fixtures/headers/zip-centralfooter.bin', actual);
          assert.deepEqual(actual, centralFooterFixture);
        });
      });

    });

  });

});