var xmlBuilder    = require('xmlbuilder')
  , dateFormatter = require('./date_formatter')
  , CustomType    = require('./customtype')

/**
 * Creates the XML for an XML-RPC method call.
 *
 * @param {String} method     - The method name.
 * @param {Array} params      - Params to pass in the call.
 * @param {Function} callback - function (error, xml) { ... }
 *   - {Object|null} error    - Any errors that occurred while building the XML,
 *                              otherwise null.
 *   - {String} xml           - The method call XML.
 */
exports.serializeMethodCall = function(method, params) {
  var params = params || []

  var xml = xmlBuilder.create()
    .begin('methodCall', { version: '1.0' })
    .ele('methodName')
      .txt(method)
    .up()
    .ele('params')

  params.forEach(function(param) {
    serializeValue(param, xml.ele('param'))
  })

  // Includes the <?xml ...> declaration
  return xml.doc().toString()
}

/**
 * Creates the XML for an XML-RPC method response.
 *
 * @param {mixed} value       - The value to pass in the response.
 * @param {Function} callback - function (error, xml) { ... }
 *   - {Object|null} error    - Any errors that occurred while building the XML,
 *                              otherwise null.
 *   - {String} xml           - The method response XML.
 */
exports.serializeMethodResponse = function(result) {
  var xml = xmlBuilder.create()
    .begin('methodResponse', { version: '1.0' })
    .ele('params')
      .ele('param')

  serializeValue(result, xml)

  // Includes the <?xml ...> declaration
  return xml.doc().toString()
}

exports.serializeFault = function(fault) {
  var xml = xmlBuilder.create()
    .begin('methodResponse', { version: '1.0' })
    .ele('fault')

  serializeValue(fault, xml)

  // Includes the <?xml ...> declaration
  return xml.doc().toString()
}

function serializeValue(value, xml) {
  var stack     = [ { value: value, xml: xml } ]
    , current   = null
    , valueNode = null
    , next      = null

  while (stack.length > 0) {
    current = stack[stack.length - 1]

    if (current.index !== undefined) {
      // Iterating a compound
      next = getNextItemsFrame(current)
      if (next) {
        stack.push(next)
      }
      else {
        stack.pop()
      }
    }
    else {
      // we're about to add a new value (compound or simple)
      valueNode = current.xml.ele('value')
      switch(typeof current.value) {
        case 'boolean':
          appendBoolean(current.value, valueNode)
          stack.pop()
          break
        case 'string':
          appendString(current.value, valueNode)
          stack.pop()
          break
        case 'number':
          appendNumber(current.value, valueNode)
          stack.pop()
          break
        case 'object':
          if (current.value === null) {
            valueNode.ele('nil')
            stack.pop()
          }
          else if (current.value instanceof Date) {
            appendDatetime(current.value, valueNode)
            stack.pop()
          }
          else if (Buffer.isBuffer(current.value)) {
            appendBuffer(current.value, valueNode)
            stack.pop()
          }
          else if (current.value instanceof CustomType) {
            current.value.serialize(valueNode)
            stack.pop()
          }
          else {
            if (Array.isArray(current.value)) {
              current.xml = valueNode.ele('array').ele('data')
            }
            else {
              current.xml = valueNode.ele('struct')
              current.keys = Object.keys(current.value)
            }
            current.index = 0
            next = getNextItemsFrame(current)
            if (next) {
              stack.push(next)
            }
            else {
              stack.pop()
            }
          }
          break
        default:
          stack.pop()
          break
      }
    }
  }
}

function getNextItemsFrame(frame) {
  var nextFrame = null

  if (frame.keys) {
    if (frame.index < frame.keys.length) {
      var key    = frame.keys[frame.index++]
        , member = frame.xml.ele('member').ele('name').text(key).up()
      nextFrame = {
        value: frame.value[key]
      , xml: member
      }
    }
  }
  else if (frame.index < frame.value.length) {
    nextFrame = {
      value: frame.value[frame.index]
    , xml: frame.xml
    }
    frame.index++
  }

  return nextFrame
}

function appendBoolean(value, xml) {
  xml.ele('boolean').txt(value ? 1 : 0)
}

var illegalChars = /^(?![^<&]*]]>[^<&]*)[^<&]*$/
function appendString(value, xml) {
  if (value.length === 0) {
    xml.ele('string')
  }
  else if (!illegalChars.test(value)) {
    xml.ele('string').d(value)
  }
  else {
    xml.ele('string').txt(value)
  }
}

function appendNumber(value, xml) {
  if (value % 1 == 0) {
    xml.ele('int').txt(value)
  }
  else {
    xml.ele('double').txt(value)
  }
}

function appendDatetime(value, xml) {
  xml.ele('dateTime.iso8601').txt(dateFormatter.encodeIso8601(value))
}

function appendBuffer(value, xml) {
  xml.ele('base64').txt(value.toString('base64'))
}
