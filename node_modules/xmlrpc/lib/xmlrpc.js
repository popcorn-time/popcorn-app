var Client = require('./client')
  , Server = require('./server')
  , CustomType = require('./customtype')

var xmlrpc = exports

/**
 * Creates an XML-RPC client.
 *
 * @param {Object} options - server options to make the HTTP request to
 *   - {String} host
 *   - {Number} port
 *   - {String} url
 *   - {Boolean} cookies
 * @return {Client}
 * @see Client
 */
xmlrpc.createClient = function(options) {
  return new Client(options, false)
}

/**
 * Creates an XML-RPC client that makes calls using HTTPS.
 *
 * @param {Object} options - server options to make the HTTP request to
 *   - {String} host
 *   - {Number} port
 *   - {String} url
 *   - {Boolean} cookies
 * @return {Client}
 * @see Client
 */
xmlrpc.createSecureClient = function(options) {
  return new Client(options, true)
}

/**
 * Creates an XML-RPC server.
 *
 * @param {Object}options - the HTTP server options
 *   - {String} host
 *   - {Number} port
 * @return {Server}
 * @see Server
 */
xmlrpc.createServer = function(options, callback) {
  return new Server(options, false, callback)
}

/**
 * Creates an XML-RPC server that uses HTTPS.
 *
 * @param {Object}options - the HTTP server options
 *   - {String} host
 *   - {Number} port
 * @return {Server}
 * @see Server
 */
xmlrpc.createSecureServer = function(options, callback) {
  return new Server(options, true, callback)
}

xmlrpc.CustomType = CustomType

