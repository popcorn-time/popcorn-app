var ZIP = require("./zip");
var FS = require("fs");
var assert = require("assert");

console.log("-------------------");
console.log("READ from Buffer");

var data = FS.readFileSync("zip.zip")
var reader = ZIP.Reader(data);
var readFromBuffer = reader.toObject('utf-8');
console.log(readFromBuffer);

reader.forEach(function (entry) {
    console.log(entry.getName(), entry.lastModified(), entry.getMode());
});

console.log("-------------------");
console.log("READ from file descriptor");

FS.open("zip.zip", "r", "0666", function(err, fd) {
    var reader = ZIP.Reader(fd);
    var readFromFileDescriptor = reader.toObject('utf-8');
    console.log(readFromFileDescriptor);
    assert.deepEqual(readFromBuffer, readFromFileDescriptor, 'READ from Buffer MUST be equal to READ from file descriptor');
});