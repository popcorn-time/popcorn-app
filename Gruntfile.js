<<<<<<< HEAD
  module.exports = function(grunt) {
=======
module.exports = function(grunt) {
  var buildPlatforms = parseBuildPlatforms(grunt.option('platforms'));
>>>>>>> 7e4d851bc02082d5bbc0260315fd61fe856d0bdc

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
<<<<<<< HEAD
        livereload: true,
      },
=======
        livereload: true
      }
    },
    nodewebkit: {
      options: {
        version: '0.9.2',
        build_dir: './build', // Where the build version of my node-webkit app is saved
        mac_icns: './images/popcorntime.icns', // Path to the Mac icon file
        mac: buildPlatforms.mac,
        win: buildPlatforms.win,
        linux32: buildPlatforms.linux32,
        linux64: buildPlatforms.linux64
      },
      src: ['./css/**', './fonts/**', './images/**', './js/**', './language/**', './node_modules/**', '!./node_modules/grunt*/**', './rc/**', './Config.rb', './index.html', './package.json', './README.md' ] // Your node-webkit app './**/*'
    },
    copy: {
      main: {
        files: [
          {
            src: 'libraries/win/ffmpegsumo.dll',
            dest: 'build/releases/Popcorn-Time/win/Popcorn-Time/ffmpegsumo.dll',
            flatten: true
          },
          {
            src: 'libraries/mac/ffmpegsumo.so',
            dest: 'build/releases/Popcorn-Time/mac/Popcorn-Time.app/Contents/Frameworks/node-webkit Framework.framework/Libraries/ffmpegsumo.so',
            flatten: true
          },
          {
            src: 'libraries/linux64/libffmpegsumo.so',
            dest: 'build/releases/Popcorn-Time/linux64/Popcorn-Time/libffmpegsumo.so',
            flatten: true
          }
        ]
      }
>>>>>>> 7e4d851bc02082d5bbc0260315fd61fe856d0bdc
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
<<<<<<< HEAD

  grunt.registerTask('css', ['compass']);

  grunt.registerTask('default', ['compass']);

};
=======
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-node-webkit-builder');

  grunt.registerTask('css', ['compass']);
  grunt.registerTask('default', ['compass']);
  grunt.registerTask('nodewkbuild', ['nodewebkit', 'copy']);


};

var parseBuildPlatforms = function(argumentPlatform) {
  // this will make it build no platform when the platform option is specified
  // without a value which makes argumentPlatform into a boolean
  var inputPlatforms = argumentPlatform || process.platform + ";" + process.arch;

  // Do some scrubbing to make it easier to match in the regexes bellow
  inputPlatforms = inputPlatforms.replace("darwin", "mac");
  inputPlatforms = inputPlatforms.replace(/;ia|;x|;arm/, "");

  var buildAll = /^all$/.test(inputPlatforms);

  var buildPlatforms = {
    mac: /mac/.test(inputPlatforms) || buildAll,
    win: /win/.test(inputPlatforms) || buildAll,
    linux32: /linux32/.test(inputPlatforms) || buildAll,
    linux64: /linux64/.test(inputPlatforms) || buildAll
  };

  return buildPlatforms;
}
>>>>>>> 7e4d851bc02082d5bbc0260315fd61fe856d0bdc
