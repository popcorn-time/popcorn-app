module.exports = function (grunt) {
  "use strict";

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', [
    'compass',
    'watch'
  ]);

  grunt.initConfig({
    config: {
      pkg : grunt.file.readJSON('package.json')
    },

    compass: {
      dist: {
        files: {
          'css/app.css': 'sass/app.scss'
        }
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      files: ['sass/**/*.scss'],
      tasks: ['compass']
    }
  });
};
