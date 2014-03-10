var path = require('path');
var child_process = require('child_process');

var exeNames = {
    windows: 'nw.exe',
    linux: 'nw',
    mac: ''
};
var osName = getOperatingSystem();
if(osName == 'windows' || osName == 'linux') {
    var exePath = path.join(__dirname, 'node-webkit', osName, exeNames[osName]);
    var child = child_process.spawn(exePath, [__dirname, '--debug'], {
        cwd: __dirname,
        detached: true,
        stdio: 'ignore'
    });
    child.unref();
}
// Mac not supported yet. I don't know how to start a .app directory.
// If someone else does, feel free to add it


function getOperatingSystem() {
    var os = require('os');
    var platform = os.platform();

    if( platform == 'win32' || platform == 'win64' ) {
        return 'windows';
    }
    if( platform == 'darwin' ) {
        return 'mac';
    }
    if( platform == 'linux' ) {
        return 'linux';
    }
    return null;
}
