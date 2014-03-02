  module.exports = function(grunt) {

  grunt.initConfig({
    compass: {
      dist: {
        files: {
          'css/app.css': 'sass/app.scss'
        }
      }
    },
    watch: {
      files: ['sass/**/*.scss'],
      tasks: ['sass'],
      options: {
        livereload: true,
      },
    },
    nodewebkit: {
      options: {
        build_dir: './build',
        mac_icns: './dist/mac/popcorntime.icns',
        mac: true,
        win: true,
        linux32: true,
      },
      src: ['./index.html', './package.json', './css/**/*', './js/**/*', './fonts/**/*', './images/**/*', './language/**/*', './tmp/**/*', './node_modules/**/*']
    },
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('css', ['compass']);

  grunt.registerTask('default', ['compass']);
  
  grunt.loadNpmTasks('grunt-node-webkit-builder');

};