var plist = require('plist'),
    path = require('path'),
    fs = require('fs'),
    Q = require('q');


module.exports = function(grunt) {

    exports.generatePlist = function(abspath, target_filename, options, appOptions) {

        // Handle the INfo.plist file
        var info = plist.parseFileSync(abspath);
        info.CFBundleDisplayName = options.app_name;
        info.CFBundleName = options.app_name;

        info.CFBundleDocumentTypes = []; // zero out any document binding
        info.UTExportedTypeDeclarations = [];

        info.CFBundleVersion = options.app_version; // TODO: if git, get commit hash!
        info.CFBundleShortVersionString = 'Version ' + options.app_version;

        if(appOptions.copyright) {
          info.NSHumanReadableCopyright = appOptions.copyright;
        }

        grunt.file.write(target_filename, plist.build(info));
    };

    exports.getFileList = function(files) {
        var package_path = null, destFiles = [], srcFiles = [], jsonfile = null;

        files.forEach(function(file) {

            file.src.filter(function(f) {
                return grunt.file.isFile(f);

            }).forEach(function(srcFile) {
                var internalFileName = path.normalize(exports.unixifyPath(srcFile));

                // Get Package JSON
                if (internalFileName.match('package.json')) {
                    jsonfile = exports.closerPathDepth(internalFileName, jsonfile);
                    package_path = path.normalize(jsonfile.split('package.json')[0] || './' );
                }

                srcFiles.push(internalFileName);
            });
        });

        // Fail if there is no valid json file
        if(!jsonfile) {
            grunt.fail.warn('Could not find a package.json in your src folder');
        }

        // Make it easy for copy to understand the destination mapping
        srcFiles.forEach(function(file) {
            destFiles.push({src:file, dest: file.replace(package_path, '')});
        });

        // We return it as an array
        return [destFiles, jsonfile];
    };

    exports.getPackageInfo = function(jsonfile) {

        grunt.verbose.writeln("Trying to get the app_name and/or app_version from your project's json file.");

        // Read JSON File
        var appPkg = grunt.file.readJSON(jsonfile);
        if(!appPkg.name || !appPkg.version) {
            grunt.fail.warn("Please make sure that your project's package.json includes a version and a name value");
        }

        return appPkg;
    };

    exports.unixifyPath = function(filepath) {
        if (process.platform === 'win32') {
            return filepath.replace(/\\/g, '/');
        } else {
            return filepath;
        }
    };

    exports.closerPathDepth = function(path1, path2) {
        if (!path2) { return path1; }

        var d1 = exports.pathDepth(path1),
            d2 = exports.pathDepth(path2);

        return d1 < d2 ? path1 : path2;
    };

    exports.pathDepth = function(absolutePath) {
        return absolutePath.split(path.sep).length;
    };

    exports.copyFile = function(src, dest) {
        var d = Q.defer();
        var stats = fs.lstatSync(src);
        try {
            grunt.file.copy(src, dest);
            fs.chmodSync(dest, stats.mode);
            d.resolve();
        } catch(err) {
            d.reject(err);
        }

        return d.promise;
    };

    return exports;
};
