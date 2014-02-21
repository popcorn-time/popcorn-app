;(function (exports, DOMParser, xmlbuilder) {
	// Checks if running in a non-browser environment
 	var inNode = typeof window === 'undefined' ? true : false
 	  , utf8_to_b64
 	  , b64_to_utf8;

 	// this library runs in browsers and nodejs, set up functions accordingly
 	if (inNode) {
 		exports.parseFile = function (filename, callback) {
 			console.warn('parseFile is deprecated. Please use parseFileSync instead.');
    		var fs = require('fs');
			var inxml = fs.readFileSync(filename, 'utf8');
			exports.parseString(inxml, callback);
  		}

  		exports.parseFileSync = function (filename) {
    		var fs = require('fs');
			var inxml = fs.readFileSync(filename, 'utf8');
			return exports.parseStringSync(inxml);
  		}

  		// set up base64 encode/decode functions
  		utf8_to_b64= function ( str ) {
  			return new Buffer(str).toString('base64');
		}
		b64_to_utf8 = function ( str ) {
		    return new Buffer(str, 'base64').toString('utf8');
		}
  	} else {
  		// we're in a browser context, find the DOMParser
		if (typeof window.DOMParser != 'undefined') {
		    DOMParser = function(xmlStr) {
		        return ( new window.DOMParser() ).parseFromString(xmlStr, 'text/xml');
		    };
		} else if (typeof window.ActiveXObject != 'undefined' &&
		       new window.ActiveXObject('Microsoft.XMLDOM')) {
		    DOMParser = function(xmlStr) {
		        var xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
		        xmlDoc.async = 'false';
		        xmlDoc.loadXML(xmlStr);
		        return xmlDoc;
		    };
		} else {
		    throw new Error('No XML parser found');
		}

		// set up base64 encode/decode functions
		if (typeof window.btoa == 'undefined') {
			throw new Error('No base64 support found');
			// TODO: shim btoa and atob if not present (ie < 10)
			//http://stackoverflow.com/questions/246801/how-can-you-encode-to-base64-using-javascript/247261#247261
		} else {
			utf8_to_b64= function ( str ) {
			    return window.btoa(unescape(encodeURIComponent( str )));
			}
			 
			b64_to_utf8 = function ( str ) {
			    return decodeURIComponent(escape(window.atob( str )));
			}
		}

	}

	exports.parseString = function (xml, callback) {
		console.warn('parseString is deprecated. Please use parseStringSync instead.');
		var doc, error, plist;
		try {
			doc = new DOMParser().parseFromString(xml);
			plist = parsePlistXML(doc.documentElement);
		} catch(e) {
			error = e;
		}
		callback(error, plist);
	}

	exports.parseStringSync = function (xml) {
		var doc = new DOMParser().parseFromString(xml);
    var plist;
		if (doc.documentElement.nodeName !== 'plist') {
			throw new Error('malformed document. First element should be <plist>');
		}
		plist = parsePlistXML(doc.documentElement);

		// if the plist is an array with 1 element, pull it out of the array
		if(isArray(plist) && plist.length == 1) {
			plist = plist[0]; 
		}
		return plist;
	}

	/**
	 * convert an XML based plist document into a JSON representation
	 * 
	 * @param object xml_node current XML node in the plist
	 * @return built up JSON object
	 */
	function parsePlistXML(node) {
		var i, new_obj, key, val, new_arr;
		if (!node)
			return null;

		if (node.nodeName === 'plist') {
			new_arr = [];
			for (i=0;i < node.childNodes.length;i++) {
				// ignore comment nodes (text) 
				if (node.childNodes[i].nodeType !== 3) {
					new_arr.push( parsePlistXML(node.childNodes[i]));
				}
			}
			return new_arr;
		}
		else if(node.nodeName === 'dict') {
			new_obj = {};
			key = null;
			for (i=0;i < node.childNodes.length;i++) {
				// ignore comment nodes (text) 
				if (node.childNodes[i].nodeType !== 3) {
					if (key === null) {
						key = parsePlistXML(node.childNodes[i]);
					} else {
						new_obj[key] = parsePlistXML(node.childNodes[i]);
						key = null;
					}
				}
			}
			return new_obj;
		}
		else if(node.nodeName === 'array') {
			new_arr = [];
			for (i=0;i < node.childNodes.length;i++) {
				// ignore comment nodes (text) 
				if (node.childNodes[i].nodeType !== 3) {
					res = parsePlistXML(node.childNodes[i]);
					if (res) new_arr.push( res );
				}
			}
			return new_arr;
		}
		else if(node.nodeName === '#text') {
			// TODO: what should we do with text types? (CDATA sections)
		}
		else if(node.nodeName === 'key') {
			return node.childNodes[0].nodeValue;
		}
		else if(node.nodeName === 'string') {
			var res = '';
			for (var d=0; d < node.childNodes.length; d++)
			{
				res += node.childNodes[d].nodeValue;
			}
			return res;
		}
		else if(node.nodeName === 'integer') {
			// parse as base 10 integer
			return parseInt(node.childNodes[0].nodeValue, 10);
		}
		else if(node.nodeName === 'real') {
			var res = '';
			for (var d=0; d < node.childNodes.length; d++)
			{
				if(node.childNodes[d].nodeType === 3) {
					res += node.childNodes[d].nodeValue;
				}
			}
			return parseFloat(res);
		}
		else if(node.nodeName === 'data') {
			var res = '';
			for (var d=0; d < node.childNodes.length; d++)
			{
				if(node.childNodes[d].nodeType === 3) {
					res += node.childNodes[d].nodeValue;
				}
			}
		
			// validate that the string is encoded as base64
			var base64Matcher = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$");
			if (!base64Matcher.test(res.replace(/\s/g,'')) ) {
				throw new Error('malformed document. <data> element is not base64 encoded');
			}

			// decode base64 data as utf8 string
			return b64_to_utf8(res);
		}
		else if(node.nodeName === 'date') {
			return new Date(node.childNodes[0].nodeValue);
		}
		else if(node.nodeName === 'true') {
			return true;
		}
		else if(node.nodeName === 'false') {
			return false;
		}
	}


  function ISODateString(d){  
    function pad(n){return n<10 ? '0'+n : n}  
    return d.getUTCFullYear()+'-'  
        + pad(d.getUTCMonth()+1)+'-'  
        + pad(d.getUTCDate())+'T'  
        + pad(d.getUTCHours())+':'  
        + pad(d.getUTCMinutes())+':'  
        + pad(d.getUTCSeconds())+'Z'  
  }

  // instanceof is horribly unreliable so we use these hackish but safer checks 
  // http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray
  function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }

  function isDate(obj) {
    return Object.prototype.toString.call(obj) === '[object Date]';
  }

  function isBoolean(obj) {
    return (obj === true || obj === false || toString.call(obj) == '[object Boolean]');
  }

  function isNumber(obj) {
    return Object.prototype.toString.call(obj) === '[object Number]';
  }

  function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }

  function isString(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
  }

  /**
   * generate an XML plist string from the input object
   *
   * @param object obj the object to convert
   * @return string converted plist
   */
  exports.build = function(obj) {
    var XMLHDR = { 'version': '1.0','encoding': 'UTF-8'}
        , XMLDTD = { 'ext': 'PUBLIC \"-//Apple Computer//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\"'}
        , doc = xmlbuilder.create()
        , child = doc.begin('plist', XMLHDR, XMLDTD).att('version', '1.0');

    walk_obj(obj, child);
    return child.end({pretty: true });
  }

  // depth first, recursive traversal of a javascript object. when complete,
  // next_child contains a reference to the build XML object.
  function walk_obj(next, next_child) {
    var tag_type, i, prop;

    if(isArray(next)) {
      next_child = next_child.ele('array');
      for(i=0 ;i < next.length;i++) {
        walk_obj(next[i], next_child);
      }
    }
    else if (isObject(next)) {
      if (inNode && next instanceof Buffer) {
        next_child.ele('data').raw(next.toString('base64'));
      } else {
        next_child = next_child.ele('dict');
        for(prop in next) {
          if(next.hasOwnProperty(prop)) {
            next_child.ele('key').txt(prop);
            walk_obj(next[prop], next_child);
          }
        }
      }
    }
    else if(isNumber(next)) {
      // detect if this is an integer or real
      tag_type =(next % 1 === 0) ? 'integer' : 'real';
      next_child.ele(tag_type).txt(next.toString());
    }
    else if(isDate(next)) {
      next_child.ele('date').raw(ISODateString(new Date(next)));
    }
    else if(isBoolean(next)) {
      val = next ? 'true' : 'false';
      next_child.ele(val);
    }
    else if(isString(next)) {
      //if (str!=obj || str.indexOf("\n")>=0) str = "<![CDATA["+str+"]]>";
      var base64Matcher = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$");
      if (!inNode && base64Matcher.test(next.replace(/\s/g,''))) {
      	// data is base 64 encoded so assume it's a <data> node
        next_child.ele('data').raw(utf8_to_b64(next));
      } else {
      	// it's not base 64 encoded, assume it's a <string> node
      	next_child.ele('string').raw(next);
      }
    }
  };

})(typeof exports === 'undefined' ? plist = {} : exports, typeof window === 'undefined' ? require('xmldom').DOMParser : null, typeof window === 'undefined' ? require('xmlbuilder') : xmlbuilder)
// the above line checks for exports (defined in node) and uses it, or creates 
// a global variable and exports to that. also, if in node, require DOMParser
// node-style, in browser it should already be present
