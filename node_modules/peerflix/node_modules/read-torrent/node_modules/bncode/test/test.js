
var benc = require('../bencode.js');


function log(msg) {
  console.log(msg)
//  process.stdout.flush()
}

function assert(msg, should, is) {
  if (! (should === is) ) {
    log(msg+" failed: should be: >"+should+"< is >"+ is + "<");
    return false
  }
  return true
}

function assert_obj(msg, should, is) {
  var s = JSON.stringify,
      should = should.toString(),
      is     = is.toString()
  if (! (should === is) ) {
    log(msg+" failed: should be: >"+should+"< is >"+ is + "<");
//    log (s(should))
//    log (s(is))
    return false
  }
  return true
}

function assert_buf(msg, should, is) {
  if (typeof(should) === "string" && is instanceof Buffer) {
    assert(msg, should, is.toString())
  } else {
    if (Buffer.isBuffer(should) && Buffer.isBuffer(is) ){
      if (should.length != is.length) {
        return assert(msg, should, is)
      }
      for (var i=0; i!=should.length; ++i) {
        if (is[i] != should[i]) {
          return assert(msg, should, is)
        }
      }
      return true
    }
    assert(msg, should, is)
  }
}

/**********************************************************************
*  Encoding tests.
***********************************************************************/

function docs () {
  var exmp = {}

  exmp.bla = "blup"
  exmp.foo = "bar"
  exmp.one = 1
  exmp.woah = {}
  exmp.woah.arr = []
  exmp.woah.arr.push(1)
  exmp.woah.arr.push(2)
  exmp.woah.arr.push(3)
  exmp.str = new Buffer("Buffers work too")

  var bencBuffer = benc.encode(exmp)
  
  return assert("src comment doc example", 
                "d3:bla4:blup3:foo3:bar3:onei1e4:woahd3:arrli1ei2ei3eee3:str16:Buffers work tooe",
                bencBuffer.toString())
}

function str_e () {
  var ret = true
  ret &= assert('str1', '4:1234', benc.encode('1234').toString() )
  ret &= assert('str2', '8:unicöde', benc.encode('unicöde').toString() )
  ret &= assert('str3', '0:', benc.encode('').toString() ) // empty strings? not sure here

  //log("assert('str1', '"+benc.encode('').toString()+"', benc.encode('').toString() )")
  //log("assert('str2', '"+benc.encode('unicöde').toString()+"', benc.encode('unicöde') )")
//  log("assert('str1', "+benc.encode('1234').toString()+", benc.encode('1234') )")
//  log(Bencode(1234).toString())
//  log(Bencode(-1234).toString())
//  log(Bencode([1,2,3,4]).toString())
//  log(Bencode({1:2, 3:4}).toString())
  return ret 
}

function num_e() {
  var ret=true
  assert('num1', 'i1234e', benc.encode(1234).toString() )
  assert('num2', 'i-1234e', benc.encode(-1234).toString() )
  assert('num3', 'i0e', benc.encode(0).toString() )
    
//  log("assert('num1', '"+benc.encode(1234).toString()+"', benc.encode(1234) )")
//  log("assert('num2', '"+benc.encode(-1234).toString()+"', benc.encode(-1234) )")
//  log("assert('num3', '"+benc.encode(0).toString()+"', benc.encode(-1234) )")
}

function list_e() {
  assert('list1', 'le', benc.encode([]).toString() )
  assert('list2', 'li1ee', benc.encode([1]).toString() )
  assert('list3', 'li1ei2ei3e4:foure', benc.encode([1,2,3,'four']).toString() )
  
  //log("assert('list1', '"+benc.encode([]).toString()+"', benc.encode([]).toString() )")
  //log("assert('list2', '"+benc.encode([1]).toString()+"', benc.encode([1]).toString() )")
  //log("assert('list3', '"+benc.encode([1,2,3,"four"]).toString()+"', benc.encode([1,2,3,'four']).toString() )")
 
}
function dict_e() {
  assert('dict1', 'de', benc.encode({}).toString() )
  assert('dict2', 'd3:bla4:blube', benc.encode({'bla':'blub'}).toString() )
  assert('dict3', 'd3:bla4:blub4:blubi4ee', benc.encode({'bla':'blub', 'blub':4}).toString() )

  //log("assert('dict1', '"+benc.encode({}).toString()+"', benc.encode({}).toString() )")
  //log("assert('dict2', '"+benc.encode({"bla":"blub"}).toString()+"', benc.encode({'bla':'blub'}).toString() )")
  //log("assert('dict3', '"+benc.encode({"bla":"blub", "blub":4}).toString()+"', benc.encode({'bla':'blub', 'blub':4}).toString() )")
 
}


/**********************************************************************
*  Decoding tests.
***********************************************************************/

function docs_d () {
  var exmp  = {},
      exmp2 = benc.decode(new Buffer("d3:bla4:blup3:foo3:bar3:onei1e4:woahd3:arrli1ei2ei3eee3:str16:Buffers work tooe"))

  exmp.bla = "blup"
  exmp.foo = "bar"
  exmp.one = 1
  exmp.woah = {}
  exmp.woah.arr = []
  exmp.woah.arr.push(1)
  exmp.woah.arr.push(2)
  exmp.woah.arr.push(3)
  exmp.str = "Buffers work too" // ha, but no decoding!

  
  for (var p in exmp) {
    if ( "woah" === p ) {
      var arr  = exmp.woah.arr,
          arr2 = exmp2.woah.arr

      assert("nested arr len", arr.length, arr2.length)
      for (var j in arr) {
        assert("nested arr len", arr[j], arr2[j])
        
      }
      continue
    }
    assert_buf("doc example (decode) : "+p, exmp[p], exmp2[p])
  }

}

function str_d () {
  var ret = true
  ret &= assert('str_d1', '1234',    benc.decode(new Buffer('4:1234')).toString() )
  ret &= assert('str_d2', 'unicöde', benc.decode(new Buffer('8:unicöde')).toString() )
  ret &= assert('str_d3', '',        benc.decode(new Buffer('0:')).toString() )

  ret &= assert('str_d4', '1234',    benc.decode('4:1234').toString() )
  ret &= assert('str_d5', 'unicöde', benc.decode('8:unicöde').toString() )
  ret &= assert('str_d6', '',        benc.decode('0:').toString() )

  ret &= assert('str_dr7', 8,        benc.decode('8:12312312').length )
  return ret 
}

function num_d() {
  var ret=true
  assert('num_d1',  1234,  benc.decode(new Buffer('i1234e')) )
  assert('num_d2', -1234,  benc.decode(new Buffer('i-1234e')) )
  assert('num_d3',     0,  benc.decode(new Buffer('i0e')) )

  assert('num_d4',  1234,  benc.decode('i1234e') )
  assert('num_d5', -1234,  benc.decode('i-1234e') )
  assert('num_d6',     0,  benc.decode('i0e') )


  var caught = false
  try {
    benc.decode(new Buffer('i1-1e')) 
  } catch (e) {
    assert("illegal num", 'not part of int at:2', e.message)
    caught = true
  }
  assert ("exception not raised", true, caught)
    
}

function list_d() {
  assert_obj('list_d1', [], benc.decode(new Buffer("le")) )
  assert_obj('list_d2', [1], benc.decode(new Buffer('li1ee')) )
  assert_obj('list_d3', [1,2,3,new Buffer('four')], benc.decode(new Buffer("li1ei2ei3e4:foure")) )
  
 
  assert_obj('list_d4', [], benc.decode("le") )
  assert_obj('list_d5', [1], benc.decode('li1ee') )
  assert_obj('list_d6', [1,2,3,new Buffer('four')], benc.decode("li1ei2ei3e4:foure") )

}
function dict_d() {
  assert_obj('dict_d1', {},             benc.decode(new Buffer("de")) )
  assert_obj('dict_d2', {"bla":new Buffer('blub')}, 
                                        benc.decode(new Buffer("d3:bla4:blube")) )
  assert_obj('dict_d3', {"bla": new Buffer('blub'), "blub":4}, 
                                        benc.decode(new Buffer("d3:bla4:blub4:blubi4ee")) )


  assert_obj('dict_d4', {},             benc.decode("de") )
  assert_obj('dict_d5', {"bla":new Buffer('blub')}, 
                                        benc.decode("d3:bla4:blube") )
  assert_obj('dict_d6', {"bla": new Buffer('blub'), "blub":4}, 
                                        benc.decode("d3:bla4:blub4:blubi4ee") )
 
}
function assert_err(msg, err_msg, func) {
  var caught = false
  try {
    func()
  } catch (e) {
    assert(msg, err_msg, e.message)
    caught = true
  }
  assert(msg + " : no exception!", true, caught)
}

function errors () {
  assert_err("err1", 'not in consistent state. More bytes coming?', function() {
    benc.decode("d8:aaaaaaaa6:bbbbbb")
  })
  assert_err("err2", 'not in consistent state. More bytes coming?', function() {
    benc.decode("lllee")
  })
  assert_err("err3", 'not in consistent state. More bytes coming?', function() {
    benc.decode("d4:this4:that4:listle")
  })
  assert_err("err4", 'end with no beginning: 6', function() {
    benc.decode("llleeee")
  })
}

function file () {  
  var de = new benc.decoder()
  var fs = require("fs")
  
  fs.readFile("test/bloeh.torrent", function (err, data) {
    if (err) throw err;
    de.decode(data)
    var result = de.result()[0]
    assert_buf("created by", "Transmission/2.33 (12565)" , result["created by"])
    assert("creation date", 1312820612 , result["creation date"])
    assert_buf("encoding", "UTF-8" , result["encoding"])
    assert("info.files0.length", 17, result.info.files[0].length)
    assert_buf("info.files0.path0", new Buffer("blöh.test", "UTF-8"), result.info.files[0].path[0])
    assert("info.files.length", 1, result.info.files.length)
    assert("info.piece length", 32768, result.info["piece length"])
    assert_buf("info.pieces", new Buffer( [0xa6, 0x1a, 0x21, 0x38, 0xa2, 0x37, 0xc8, 0xd8, 0x99, 0x71, 0x0e, 0xbe, 0x91, 0x7f, 0xcf, 0xa3, 0x79, 0x12, 0x1b, 0x21] ), result.info.pieces)
  })
}

function file_readStream (filename) {
  var fs = require('fs')

  var rs = fs.createReadStream(filename);

  var decoder = new benc.decoder();

  rs.on('data', function(data) {
    try {
      decoder.decode(data);
    } catch (err) {
      fs.close(rs.fd);
      throw err;
    }
  });

  rs.on('end', function() {
  });
}

function file_bug() {
  var fs = require('fs')
  var de = new benc.decoder()

  var file = 'test/test.torrent'
  
  function file_bug2(data) {
    var data2 = fs.readFileSync(file, 'binary')

    benc.decode(data2, "binary")
    de.decode(data2, "binary")
    
  }

  fs.readFile(file, function(err, data) {
    de.decode(data)
    
    file_bug2(data) 
  })
}

function list_0() {
  var data = 'li0ee';
  var decoded = benc.decode(data);
  assert_obj("List with 0", [0], decoded);
}

docs()
str_e()
num_e()
list_e()
dict_e()
docs_d()
str_d()
num_d()
list_d()
errors()
file()
file_bug()
list_0()
//file_readStream("test/bloeh.torrent");
//console.log("here")
file_readStream("test/chipcheezum.torrent");
file_readStream("test/videos.torrent");


