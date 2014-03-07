'use strict';

var grunt = require('grunt');
var util = require('../tasks/lib/utils')(grunt);


/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.util = {
  getFileList: function(test) {
    test.expect(2);

    var files, actual, expected;

    // Test Default setup
    files = grunt.task.normalizeMultiTaskFiles({
      src: ['test/fixtures/get_file_list/default/**/**']
    });

    expected = [
      [{
        src: 'test/fixtures/get_file_list/default/images/imagefile',
        dest: 'images/imagefile'
      }, {
        src: 'test/fixtures/get_file_list/default/javascript/bower_packages/simple/package.json',
        dest: 'javascript/bower_packages/simple/package.json'
      }, {
        src: 'test/fixtures/get_file_list/default/javascript/jsfile',
        dest: 'javascript/jsfile'
      }, {
        src: 'test/fixtures/get_file_list/default/node_modules/package/package.json',
        dest: 'node_modules/package/package.json'
      }, {
        src: 'test/fixtures/get_file_list/default/package.json',
        dest: 'package.json'
      }],
      'test/fixtures/get_file_list/default/package.json'
    ];

    actual = util.getFileList(files);
    test.deepEqual(actual, expected, 'should normalize the grunt files.');

    // Test multiple src values
    files = grunt.task.normalizeMultiTaskFiles({
      src: [
      'test/fixtures/get_file_list/default/package.json',
      'test/fixtures/get_file_list/default/javascript/**',
      'test/fixtures/get_file_list/default/images/**',
      'test/fixtures/get_file_list/default/node_modules/**'
      ]
    });

    actual = util.getFileList(files);
    test.notDeepEqual(actual, expected, 'should normalize the grunt files array.');

    // files = grunt.task.normalizeMultiTaskFiles({
    //   src: {
    //     files: [{
    //       expand: true,
    //       dot: true,
    //       cwd: 'test/fixtures/get_file_list/multiple/dist',
    //       src: [
    //         'index.html',
    //         '*/**/*',
    //         '!bower_components/**/*'
    //       ]
    //     },
    //     {
    //       expand: true,
    //       dot: true,
    //       cwd: '<%= yeoman.app %>',
    //       src: ['package.json']
    //     }]
    //   }
    // });



    test.done();
  }
};
