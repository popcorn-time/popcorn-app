/*
 * (c) 2011 Tim Becker, see file LICENSE for details
 */

/*
 * Provides functionality for bencoding and decoding as use in
 * bittorrent and described in:
 *  http://www.bittorrent.org/beps/bep_0003.html
 * 
 * Encoding is as follows:
 *
 *    var benc  = require("bencode"),
 *        exmp = {}
 *
 *    exmp.bla = "blup"
 *    exmp.foo = "bar"
 *    exmp.one = 1
 *    exmp.woah = {}
 *    exmp.woah.arr = []
 *    exmp.woah.arr.push(1)
 *    exmp.woah.arr.push(2)
 *    exmp.woah.arr.push(3)
 *    exmp.str = new Buffer("Buffers work too")
 *
 *    var bencBuffer = benc.encode(exmp) i
 *
 *    // d3:bla4:blup3:foo3:bar3:onei1e4:woahd3:arr \
 *    // li1ei2ei3eee3:str16:Buffers work tooe
 *
 *
 * Decoding will work in progressively, e.g. if you're receiving partial
 * bencoded strings on the network:
 *
 *    var benc = require("bencode"),
 *        buf  = null
 *
 *    decoder = new bencode.decoder()
 *    while (buf = receiveData()) {
 *      decoder.decode(buf)
 *    }
 *    
 *    log(decoder.result())
 *
 *
 * Or "all in one"
 *
 *    var benc = require("bencode"),
 *        buf  = getBuffer(),
 *        dec  = benc.decode(buf)
 *
 *    log(dec.bla)
 *
 *
 * There are some subtleties concerning bencoded strings. These are
 * decoded as Buffer objects because they are just strings of raw bytes
 * and as such would wreak havoc with multi byte strings in javascript.
 *
 * The exception to this is strings that appear as keys in bencoded
 * dicts. These are decoded as Javascript Strings, as they should always
 * be strings of (ascii) characters and if they weren't decoded as JS
 * Strings, dict's would map to Javascript objects with properties.
 *
 */



var I     = "i".charCodeAt(0)
var L     = "l".charCodeAt(0)
var E     = "e".charCodeAt(0)
var D     = "d".charCodeAt(0)
var COLON = ":".charCodeAt(0)

var INITIAL    = 0
var STRING_LEN = INITIAL    + 1
var STRING     = STRING_LEN + 1
var COLON      = STRING     + 1
var SINTEGER   = COLON      + 1
var INTEGER    = SINTEGER   + 1


function log (m) {console.log(m); process.stdout.flush()}

/*
 * This is the internal state machine for taking apart bencoded strings,
 * it's not exposed in the eports.  It's constructed with four callbacks
 * that get fired when:
 *
 * cb: a value (string or number) is encountered 
 * cb_list: a begin list element is encountered 
 * cb_dict: a beginning of dictionary is encountered.  
 * cd_end: an end element, wheter dict or list is encountered
 *
 * Once constructed, the machine may be fed with buffers containing
 * partial bencoded string. Call `consistent` to check whether the
 * current state is consistent, e.g. not smack-dap in the middle of 
 * a string or a number and if the dict, list and end calls balance
 *
 *
 * The functionality being so rudimentary requires some more state and
 * logic in the code executing the machine, for this see Context, below.
 *
 */
 
var BdecodeSMachine = function (cb, cb_list, cb_dict, cb_end) {
  var self    = this
  var pos     = 0
  var depth   = 0
  var state   = INITIAL
  var cb      = cb
  var cb_list = cb_list
  var cb_dict = cb_dict
  var cb_end  = cb_end
  
  this.consistent = function() {
    return (state === INITIAL && depth === 0)
  }
  
  var strLen = 0
  var str    = ""
  var _int   = 0
  var neg    = false
  var strLen = 0

  this.parse = function (buffer, encoding) {
    encoding = encoding ? encoding : "UTF-8"
    if ("string" === typeof(buffer) ) {
      buffer = new Buffer(buffer, encoding)
    }
    for (var pos = 0; pos != buffer.length; ++pos) {
        
      switch(state) {
        case INITIAL:
          switch(buffer[pos]){
            case 0x30:
            case 0x31:
            case 0x32:
            case 0x33:
            case 0x34:
            case 0x35:
            case 0x36:
            case 0x37:
            case 0x38:
            case 0x39:
              state = STRING_LEN
              strLen = 0
              strLen += buffer[pos] - 0x30
              break
            case I:
              state = SINTEGER
              _int  = 0
              neg   = false
              break
            case L:
              state = INITIAL
              depth += 1
              cb_list()
              break
            case D:
              state = INITIAL
              depth += 1
              cb_dict()
              break
            case E:
              state = INITIAL
              depth -= 1
              if (depth < 0) {
                throw new Error("end with no beginning: "+pos)
              } else {
                cb_end()
              }
              break
          }
          break;
        case STRING_LEN:
          if (integer(buffer[pos])) {
            strLen *= 10
            strLen += buffer[pos] - 0x30
          } else {
            str = new Buffer(strLen)
            pos -=1
            state = COLON
          }
          break
        case COLON:
          if (buffer[pos] != ":".charCodeAt(0)) {
            throw new Error("not a colon at:"+pos.toString(16))
          }
          state = STRING
          // in case this is a zero length string, there's
          // no bytes to be collected.
          if (0 === strLen) {
            cb(new Buffer(0))
            state = INITIAL
          }
          break
        case STRING:
          if (0 === strLen) {
            cb(str)
            state = INITIAL
          } else {
            //str += String.fromCharCode(buffer[pos]) // not unicode safe..
            str[str.length-strLen] = buffer[pos]
            strLen -= 1
            if (0 === strLen) {
              cb(str)
              state = INITIAL
            }
          }
          break
        case SINTEGER:
          state = INTEGER
          if (buffer[pos] == "-".charCodeAt(0)) {
            neg = true  // handle neg and zero within value.
            break
          } // else fall through 
        case INTEGER:
          if (integer(buffer[pos])) {
            _int *= 10
            _int += buffer[pos] - 0x30
          } else if (buffer[pos] == "e".charCodeAt(0)) {
            var ret = neg ? 0 - _int : _int
            cb(ret)
            state = INITIAL
          } else {
            throw new Error("not part of int at:"+pos.toString(16))
          }
          break;
      } // switch state
    } // for buffer  
  } // function parse

  
  var integer = function (value) {
    // check that value is a number and that
    // its value is ascii integer.
    if (! (typeof(value)==='number') ) {
      return false 
    }
    return between(value, 0x30, 0x39)
  }
  var between = function(val, min, max) {
    return (min <= val  && val <= max)
  }


} // end BdecodeSMachine

/*
 * The exported decode functionality.
 */
var Bdecode = function () {
  // markers
  var DICTIONARY_START = {}
  var LIST_START       = {}

  var Context  = function() {
    var self  = this
    var stack = []

    this.cb   = function(o){
      stack.push(o)
    }
    this.cb_list = function(){
      self.cb(LIST_START)
    }
    this.cb_dict = function(){
      self.cb(DICTIONARY_START)
    }

    this.cb_end  = function(){
      
      // unwind the stack until either a DICTIONARY_START or LIST_START is
      // found, create arr or hash, stick unwound stack on, push arr or hash
      // back onto stack
      
      var obj       = null,
          tmp_stack = []

      while ( undefined !== (obj = stack.pop()) ) {
        if (LIST_START === obj) {
          var obj2 = null
          var list = []
          while( undefined !== (obj2 = tmp_stack.pop()) ) {
            list.push(obj2)
          }
          self.cb(list)
          break
        } else if (DICTIONARY_START === obj) {
          var key = null,
              val = null,
              dic = {}
          while ( (undefined !== (key = tmp_stack.pop())) && (undefined !== (val = tmp_stack.pop())) ) {
            dic[key.toString()] = val
          }

          if (undefined !== key && undefined === dic[key]) {
            throw new Error("uneven number of keys and values A")
          }
          self.cb(dic)
          break
        } else {
          tmp_stack.push(obj)
        }
      }
      if (tmp_stack.length > 0) {
        // could this case even occur?
        throw new Error("uneven number of keys and values B")
      }
    }
    this.result = function () {
      return stack
    }
  }
 
  var self      = this,
      ctx       = new Context(),
      smachine  = new BdecodeSMachine(ctx.cb, ctx.cb_list, ctx.cb_dict, ctx.cb_end)

  this.result    = function () {
    if (!smachine.consistent()) {
      throw new Error("not in consistent state. More bytes coming?")
    }
    return ctx.result()
  }

  this.decode = function(buf, encoding) {
    smachine.parse(buf, encoding)
  }
} 

var Bencode = function(obj) {
  var self = this
  var to_encode = obj

  switch (typeof (obj) ) {
    case "string":
      return encodeString(obj)
    case "number":
      return encodeNumber(obj)
      break
    case "object":
      if (obj instanceof Array) {
        return encodeList(obj) 
      } else if (obj instanceof Buffer) {
        return encodeBuffer(obj)
      }
      
      {
        // assume it's a hash
        return encodeDict(obj)
      }
  }

  function encodeString(obj) {
    var blen = Buffer.byteLength(obj),
        len  = blen.toString(10),
        buf  = new Buffer(len.length + 1 + blen)
    
    buf.write(len, 0, "ascii")
    buf.write(":", len.length, "ascii")
    buf.write(obj, len.length+1, "utf8")

    return buf
  }

  function encodeNumber(num) {
    var n   = num.toString(10),
        buf = new Buffer(n.length+2)

    buf.write("i", 0)
    buf.write(n,   1)
    buf.write("e", n.length+1)

    return buf
  }

  function encodeDict(obj) {
    
    var func = function (obj, pos) {
      for (var p in obj) {
        var key = Bencode(p),
            val = Bencode(obj[p])
        ensure(key.length + val.length, pos)
        key.copy(buffer, pos, 0)
        pos += key.length
        val.copy(buffer, pos, 0)
        pos += val.length
      }
      return pos
    }
    return assemble(obj, "d", func)
  }

  function encodeList(obj) {
    var func = function(obj, pos) {
      obj.forEach (function(o){
        var elem = Bencode(o)

        ensure(elem.length, pos)
        elem.copy(buffer, pos, 0)
        pos += elem.length
      })
      return pos
    }
    return assemble(obj, "l", func)
  }

  function encodeBuffer(obj) {
    var len = obj.length.toString(10),
        buf = new Buffer(len.length+1+obj.length);

    buf.write(len, 0, "ascii")
    buf.write(":", len.length, "ascii")
    obj.copy(buf, len.length+1, 0)
    return buf
      
  }

  var buffer = null
  function assemble (obj, prefix, func) {
    var pos = 0

    ensure(1024, 0)
    buffer.write(prefix, pos++)
    
    pos = func(obj, pos)
    ensure(1, pos)

    buffer.write("e", pos++)
    return buffer.slice(0, pos)
  }

  function ensure (num, pos) {
    if (!buffer) {
      buffer = new Buffer(num)
    } else {
      if (buffer.length > num+pos+1) {
        return
      } else {
        var buf2 = new Buffer(buffer.length + num) 
        buffer.copy(buf2, 0, 0)
        buffer = buf2
      }
    }
  }
}

function decode (buffer, encoding) {
  var decoder = new Bdecode()

  decoder.decode(buffer, encoding)
  return decoder.result()[0]


}

exports.encode  = Bencode
exports.decoder = Bdecode
exports.decode  = decode


 
 



