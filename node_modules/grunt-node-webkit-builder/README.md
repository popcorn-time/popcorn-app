# grunt-node-webkit-builder

> Let's you build your node-webkit apps for mac, win and linux with grunt. It will download the prebuilt binaries for a specify version, unpacks it, creates a release folder, create the app.nw file for a specified directory and copys the app.nw file where it belongs.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-node-webkit-builder --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-node-webkit-builder');
```

## The "nodewebkit" task


### Options

#### options.version
Type: `String`
Default value: `'0.8.4'`

The version of node-webkit you want to use. [Here is a list](https://github.com/rogerwang/node-webkit/wiki/Downloads-of-old-versions) of all available releases

#### options.app_name
Type: `String`
Default value: `null`

The Name of your node-webkit app.
If this value is set to null, it will autodetect the `name` form your projects package.json. This will be used to generate a plist file for mac.

#### options.app_version
Type: `String`
Default value: `null`

The version of your node-webkit app.
  If this value is set to null, it will autodetect the `version` form your projects package.json. This will be used to generate a plist file for mac.

#### options.build_dir
Type: `String`
Default value: `null`

This is where the prebuilt binaries and the releases are saved.

#### options.force_download
Type: `Boolean`
Default value: `false`

This will delete everything in your `build_dir` directory, including the cached downloaded prebuilt binaries

#### options.timestamped_builds
Type: `Boolean`
Default Value: `false`

Enables the creation of release directories named with a timestamp instead of the app_version.

#### options.win
Type: `Boolean`
Default value: `true`

Do you want to download and build a windows version

#### options.mac
Type: `Boolean`
Default value: `true`

Do you want to download and build a mac version

#### options.linux32
Type: `Boolean`
Default value: `false`

Do you want to download and build a linux32 version

#### options.linux64
Type: `Boolean`
Default value: `false`

Do you want to download and build a linux64 version

#### options.credits
Type: `String`
Default value: `false`

MAC ONLY: The path to your credits.html file. If your don't provide your own it will use the one provided by node-webkit

#### options.mac_icns
Type: `String`
Default value: `false`

MAC ONLY: The path to your ICNS icon file. If your don't provide your own it will use the one provided by node-webkit

#### options.keep_nw
Type: `Boolean`
Default value: `false`

This will keep the zipped .nw file in the releases folder

#### options.download_url
Type: `String`
Default value: `https://s3.amazonaws.com/node-webkit/`

The URL where the prebuilt binaries are. Only change this if you know what you are doing

#### options.zip
Type: `Boolean`
Default value: `false`

MAC ONLY: Use a `app.nw` folder instead of `ZIP` file, this significantly improves the startup speed of applications on `mac`, since no decompressing is needed. Builds on other platforms will still use `ZIP` files.

### Usage Examples

```js
grunt.initConfig({
  nodewebkit: {
    options: {
        build_dir: './webkitbuilds', // Where the build version of my node-webkit app is saved
        mac: true, // We want to build it for mac
        win: true, // We want to build it for win
        linux32: false, // We don't need linux32
        linux64: false // We don't need linux64
    },
    src: ['./example/public/**/*'] // Your node-wekit app
  },
})
```


## To Do:
- Port the logic into a [separate npm module](https://github.com/mllrsohn/node-webkit-builder) and make a wrapper for grunt/gulp/what-ever-the-next-thing-is 


## Release History
- 2013-09-19    Removed config merging (but kept the lookup for version number and name), added keep_nw option, fixed various small bugs.
- 2013-09-09    fixed accidential deletion of nw.exe on windows builds, adding several improvements, opt in for timestamped builds, using version and name from package.json to name the build product and build dir, renamed download directory to `cache`, added merge from package.json options for nodewebkit (no need to add configuration to Gruntfile, but stays optional)
- 2013-08-20    fix for the unzip lib
- 2013-08-13    initial release
