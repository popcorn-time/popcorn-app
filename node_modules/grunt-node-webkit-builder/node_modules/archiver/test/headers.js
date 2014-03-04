/*global before,describe,it */
var fs = require('fs');

var assert = require('chai').assert;

var common = require('./helpers/common');

var tar = require('../lib/modules/tar/headers');

var testDate = new Date('Jan 03 2013 14:26:38 GMT');
var testDateEpoch = 1357223198;

describe('headers', function() {

  describe('tar', function() {
    var fileFixture = fs.readFileSync('test/fixtures/headers/tar-file.bin');
    var filePrefixFixture = fs.readFileSync('test/fixtures/headers/tar-fileprefix.bin');

    describe('#encode(type, object)', function() {

      describe('type->file', function() {
        var actual = tar.encode('file', {
          name: 'test.txt',
          date: testDate,
          mode: 0644,
          size: 23,
          owner: 'test',
          group: 'test'
        });

        it('should return an instance of Buffer', function() {
          assert.instanceOf(actual, Buffer);
        });

        it('should have a length of 512 bytes', function() {
          assert.lengthOf(actual, 512);
        });

        it('should match provided fixture', function() {
          //fs.writeFileSync('test/fixtures/headers/tar-file.bin', actual);
          assert.deepEqual(actual.toString(), fileFixture.toString());
        });

        it('should use prefix for deep paths', function() {
          var deepPath = 'vvmbtqhysigpregbdrc/pyqaznbelhppibmbykz/';
          deepPath += 'qcbclwjhktiazmhnsjt/kpsgdfyfkarbvnlinrt/';
          deepPath += 'holobndxfccyecblhcc/';
          deepPath += deepPath;

          var actual = tar.encode('file', {
            name: deepPath + 'test.txt',
            date: testDate,
            size: 23
          });

          //fs.writeFileSync('test/fixtures/headers/tar-fileprefix.bin', actual);
          assert.deepEqual(actual.toString(), filePrefixFixture.toString());
        });
      });

    });

    describe('#decode(type, buffer)', function() {

      describe('type->file', function() {
        var actual = tar.decode('file', fileFixture);

        it('should return an object', function() {
          assert.isObject(actual);
        });

        it('should properly decode pre-posix attributes', function() {
          assert.equal(actual.name, 'test.txt');
          assert.equal(actual.uid, 0);
          assert.equal(actual.gid, 0);
          assert.equal(actual.mode, 420);
          assert.equal(actual.size, 23);
          assert.deepEqual(actual.date, testDate);
          assert.equal(actual.mtime, testDateEpoch);
          assert.equal(actual.checksum, 5490);
          assert.equal(actual.type, '0');
          assert.equal(actual.linkName, '');
        });

        it('should properly decode ustar attributes', function() {
          assert.equal(actual.ustar, true);
          assert.equal(actual.ustarVersion, '00');
          assert.equal(actual.owner, 'test');
          assert.equal(actual.group, 'test');
          assert.equal(actual.devMajor, 0);
          assert.equal(actual.devMinor, 0);
          assert.equal(actual.prefix, '');
        });
      });

    });

    describe('HeaderTarFile', function() {
      var HeaderTarFile = tar.file;
      var thing = new HeaderTarFile();

      describe('#_parseNumeric(num, len)', function() {
        it('should convert octal strings to numeric values', function() {
          assert.equal(thing._parseNumeric('00000021'), 17);
        });
      });

      describe('#_prepNumeric(num, len)', function() {
        it('should convert numeric values to octal strings, padding when needed', function() {
          assert.equal(thing._prepNumeric(17, 7), '000021\0');
        });
      });

      describe('#_splitFilePath(filepath)', function() {
        it('should split a filepath into a name and prefix', function() {
          var deepPath = 'vvmbtqhysigpregbdrc/pyqaznbelhppibmbykz/';
          deepPath += 'qcbclwjhktiazmhnsjt/kpsgdfyfkarbvnlinrt/';
          deepPath += 'holobndxfccyecblhcc/';
          deepPath += deepPath;

          var actual = thing._splitFilePath(deepPath + 'file.txt');

          assert.deepEqual(actual, [
            "qcbclwjhktiazmhnsjt/kpsgdfyfkarbvnlinrt/holobndxfccyecblhcc/file.txt",
            "vvmbtqhysigpregbdrc/pyqaznbelhppibmbykz/qcbclwjhktiazmhnsjt/kpsgdfyfkarbvnlinrt/" +
            "holobndxfccyecblhcc/vvmbtqhysigpregbdrc/pyqaznbelhppibmbykz"
          ]);
        });
      });

    });

  });

});