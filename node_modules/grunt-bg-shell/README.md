grunt-bg-shell
============

Improve your workflow by running commands in the background and in parallel using [Grunt](https://github.com/gruntjs/grunt). 

## Getting Started
*Note: This plugin requires Grunt `~0.4.0`*

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-bg-shell --save-dev
```
Then add the task to your `Gruntfile.js` with this line:
```js
grunt.loadNpmTasks('grunt-bg-shell');
```

## Sample Usage

For example, say you want to run your node server and also compile coffeescript and sass/scss files all in the same terminal. You could acheive that with the following config:

```javascript
module.exports = function (grunt) {
  grunt.initConfig({
    bgShell: {
      _defaults: {
        bg: true
      },
      
      watchCompass: {
        cmd: 'compass watch'
      },
      watchCoffee: {
        cmd: 'coffee --watch --output lib/ src/'
      },
      runNode: {
        cmd: 'node server.js',
        bg: false
      }
    }
  });
  grunt.registerTask('default', ['bgShell:watchCompass','bgShell:watchCoffee','bgShell:runNode']);
};
```

## Available Options
```javascript
bgShell: {
  lsTasks: {
    cmd: 'ls -la', // or function(){return 'ls -la'}
    execOpts: {
      cwd: './tasks'
    },
    stdout: true,
    stderr: true,
    bg: false,
    fail: false,
    done: function(){}
  }     
}
```
* `cmd`: command to execute or `function(){}` that returns a command to execute
* `execOpts`: options for 
  [`child_process.exec`](http://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback).
  If `execOpts.maxBuffer` set to `false`, `0`, `NaN` or `Infinite` it won't buffer stdout and stderr for `done` callback
* `stdout`: `true`, `false` or `function(out){}`
* `stderr`: `true`, `false` or `function(err){}`
* `bg`: background execution
* `fail`: fail grunt on error
* `done`: callback after execution `function(err, stdout, stderr){}`


## Default Options
```javascript
bgShell: {
  _defaults: {
    execOpts: {},
    stdout: true,
    stderr: true,
    bg: false,
    fail: false,
    done: function (err, stdout, stderr) {
    }
  },
}
```

## Troubleshooting

If you get
```
Error: stdout maxBuffer exceeded
```
You should set `execOpts.maxBuffer` to `false`. But you won't get stdout and strerr in `done` callback

Example:
```javascript
bgShell: {
  lsTasks: {
    cmd: 'ls -la',
    execOpts: {
      maxBuffer: false
    },
    stdout: function(chunk){
      // process your stdout chunk
    },
    stderr: function(chunk){
      // process your stderr chunk
    },
    done: function (err, stdout, stderr) {
      // stdout === null
      // stderr === null
    }
  }
}
```
