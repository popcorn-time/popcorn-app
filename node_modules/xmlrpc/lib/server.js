var http             = require('http')
  , https            = require('https')
  , url              = require('url')
  , EventEmitter     = require('events').EventEmitter
  , Serializer       = require('./serializer')
  , Deserializer     = require('./deserializer')

/**
 * Creates a new Server object. Also creates an HTTP server to start listening
 * for XML-RPC method calls. Will emit an event with the XML-RPC call's method
 * name when receiving a method call.
 *
 * @constructor
 * @param {Object|String} options - The HTTP server options. Either a URI string
 *                                  (e.g. 'http://localhost:9090') or an object
 *                                  with fields:
 *   - {String} host              - (optional)
 *   - {Number} port
 * @param {Boolean} isSecure      - True if using https for making calls,
 *                                  otherwise false.
 * @return {Server}
 */
function Server(options, isSecure, onListening) {

  if (false === (this instanceof Server)) {
    return new Server(options, isSecure)
  }
  onListening = onListening || function() {}
  var that = this

  // If a string URI is passed in, converts to URI fields
  if (typeof options === 'string') {
    options = url.parse(options)
    options.host = options.hostname
    options.path = options.pathname
  }

  function handleMethodCall(request, response) {
    var deserializer = new Deserializer()
    deserializer.deserializeMethodCall(request, function(error, methodName, params) {
      if (that._events.hasOwnProperty(methodName)) {
        that.emit(methodName, null, params, function(error, value) {
          var xml = null
          if (error !== null) {
            xml = Serializer.serializeFault(error)
          }
          else {
            xml = Serializer.serializeMethodResponse(value)
          }
          response.writeHead(200, {'Content-Type': 'text/xml'})
          response.end(xml)
        })
      }
      else {
        that.emit('NotFound', methodName, params)
        response.writeHead(404)
        response.end()
      }
    })
  }

  this.httpServer = isSecure ? https.createServer(options, handleMethodCall)
                            : http.createServer(handleMethodCall)

  process.nextTick(function() {
    this.httpServer.listen(options.port, options.host, onListening)
  }.bind(this))
  this.close = function(callback) {
    this.httpServer.once('close', callback)
    this.httpServer.close()
  }.bind(this)
}

// Inherit from EventEmitter to emit and listen
Server.prototype.__proto__ = EventEmitter.prototype

module.exports = Server

