module.exports = compact2string = function (buf) {

  if(buf.length !== 6)
    throw new Error("Invalid Compact IP/PORT, It should contain 6 bytes");

  return buf[0] + "." + buf[1] + "." + buf[2] + "." + buf[3] + ":" + buf.readUInt16BE(4);
};

compact2string.multi = function  (buf) {

  if(buf.length % 6 !== 0)
    throw new Error("buf length isn't multiple of compact IP/PORTs (6 bytes)");

  var output = [];
  for (var i = 0; i <= buf.length - 1; i = i + 6) {
    output.push(compact2string(buf.slice(i, i + 6)));
  }
  
  return output;

};

