module.exports = (grunt) ->
  "use strict"

  require('./tasks/bg-shell') grunt

  grunt.initConfig
      bgShell:
        _defaults:
          execOpts: null
          stdout: true
          stderr: true
          bg: false
          fail: false
          done: (err, stdout, stderr) ->

        testAsync:
          cmd: 'ls'
          bg: true

        testSync:
          cmd: 'ls -la'

        testFunction:
          cmd: -> 'ls'


  grunt.registerTask 'default', 'bgShell'
