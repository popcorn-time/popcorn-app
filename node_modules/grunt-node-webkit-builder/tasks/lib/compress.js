'use strict';

var fs = require('fs'),
    Q = require('q'),
    path = require('path'),
    archiver = require('archiver'),
    Readable = require('lazystream').Readable,
    Writable = require('lazystream').Writable;


// Download and unzip/untar the node wekit files from aws
// Mostly copied from grunt-contrib-compress
module.exports = function(grunt) {
    var utils = require('./utils')(grunt);

    // Generate a Zip file from a directory and a destination path
    // and returns back a read stream
    exports.generateZip = function(files, dest) {
        var zipDone = Q.defer(),
            destFiles = [],
            archive = archiver('zip'),
            destStream =  fs.createWriteStream(dest);

        // Resolve on close
        destStream.on('finish', zipDone.resolve);

        // Report Error
        archive.on('error', function(err) {
          grunt.log.error(err);
          grunt.fail.warn('Archiving failed.');
        });

        // Pipe archive to the destStream
        archive.pipe(destStream);

        // Push the files into the zip stream
        files.forEach(function(srcFile) {
            var srcStream = new Readable(function() {
              return fs.createReadStream(srcFile.src);
            });
            archive.append(srcStream, { name: srcFile.dest }, function(err) {
              grunt.verbose.writeln('Archiving ' + srcFile.src + ' -> ' + '/' + srcFile.dest.cyan);
            });
        });

        archive.finalize();

        return zipDone.promise;
    };

    exports.generateFolder = function(files, dest, type) {
        return Q.all(files.map(function(srcFile) {
            return utils.copyFile(
                srcFile.src,
                path.join(
                    dest,
                    srcFile.dest
                )
            );
        }))
        .then(function() {
            return type;
        });
    };

    exports.cleanUpRelease = function(nwPath) {

        if(grunt.file.exists(nwPath)) {
            grunt.file.delete(nwPath, {
              force: true
            });
        }
    };

    exports.generateRelease = function(relaseFile, zipPath, type, nwpath) {
        var releaseDone = Q.defer(),
            ws = fs.createWriteStream(relaseFile),
            zipStream = fs.createReadStream(zipPath),
            nwpath_rs;

        ws.on('error', function(err) {
            grunt.fail.fatal(err);
        });

        ws.on('finish', function() {
            if(type.indexOf('linux') !== -1) {
                fs.chmodSync(relaseFile, '0755');
            }
            releaseDone.resolve(type);
        });

        if(type === 'mac') {
            // On osx just copy to the target location
            zipStream.pipe(ws);
        } else {
            // on windows and linux cat the node-webkit with the nw archive
            nwpath_rs = fs.createReadStream(nwpath);

            nwpath_rs.on('error', function(err) {
                grunt.fail.fatal(err);
            });

            nwpath_rs.on('end', function(){
                zipStream.pipe(ws);
            });

            nwpath_rs.pipe(ws, { end: false });
        }

        return releaseDone.promise;
    };

    return exports;
};
