var compact2string = require("../");
var Buffer = require("buffer").Buffer;

var ipports = compact2string.multi(new Buffer("0A0A0A05008064383a636f6d", "hex"));
console.log(ipports);