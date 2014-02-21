var dateFormatter = exports

// Source: http://webcloud.se/log/JavaScript-and-ISO-8601/
var iso8601 = new RegExp(
  '([0-9]{4})([-]?([0-9]{2})([-]?([0-9]{2})'
+ '(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?'
+ '(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?'
)

/*
 * Converts a date time stamp following the ISO8601 format to a JavaScript Date
 * object.
 *
 * @param {String} time - String representation of timestamp.
 * @return {Date}       - Date object from timestamp.
 */
dateFormatter.decodeIso8601 = function(time) {
  var dateParts = time.toString().match(iso8601)
  if (!dateParts) {
    throw new Error('Expected a ISO8601 datetime but got \'' + time + '\'')
  }

  var date = new Date(dateParts[1], 0, 1)
  if (dateParts[3]) {
    date.setMonth(dateParts[3] - 1)
  }
  if (dateParts[5]) {
    date.setDate(dateParts[5])
  }
  if (dateParts[7]) {
    date.setHours(dateParts[7])
  }
  if (dateParts[8]) {
    date.setMinutes(dateParts[8])
  }
  if (dateParts[10]) {
    date.setSeconds(dateParts[10])
  }
  if (dateParts[12]) {
    date.setMilliseconds(Number('0.' + dateParts[12]) * 1000)
  }

  return date
}

/**
 * Converts a JavaScript Date object to an ISO8601 timestamp.
 *
 * @param {Date} date - Date object.
 * @return {String}   - String representation of timestamp.
 */
dateFormatter.encodeIso8601 = function(date) {
  return zeroPad(date.getFullYear(), 4)
    + zeroPad(date.getMonth() + 1, 2)
    + zeroPad(date.getDate(), 2)
    + 'T'
    + zeroPad(date.getHours(), 2)
    + ':'
    + zeroPad(date.getMinutes(), 2)
    + ':'
    + zeroPad(date.getSeconds(), 2)
}

/**
 * Helper function to pad the digits with 0s to meet date formatting
 * requirements.
 *
 * @param {Number} digit  - The number to pad.
 * @param {Number} length - Length of digit string, prefix with 0s if not
 *                          already length.
 * @return {String}       - String with the padded digit
 */
function zeroPad(digit, length) {
  var padded = '' + digit
  while (padded.length < length) {
    padded = '0' + padded
  }

  return padded
}

