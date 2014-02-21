var compact2string = require("../");
var Buffer = require("buffer").Buffer;

var iphost = compact2string(new Buffer("0A0A0A05FF80", "hex"));

console.log(iphost);