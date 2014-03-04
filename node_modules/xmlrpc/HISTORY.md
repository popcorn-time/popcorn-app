## 1.2.0 / 2014-01-12

 * Adds (tested) support for Node v0.10 and v0.11.
 * Drops support for Node v0.6.
 * Adds a Custom Type serializer for non-standard XML-RPC types.

## 1.1.1 / 2013-09-22

 * Adds CDATA deserialization.
 * Updates XMLBuilder to get rid of warnings at installation time.
 * Cleans up unformatted code.
 * Removes vestigial code from ancient v0.4 days.

## 1.1.0 / 2012-11-13

 * Supports optional listening handler in Server.
 * Adds close function to server.
 * Adds cookie support to client.
 * Changes minimum Node engine to v0.6.

## 1.0.2 / 2012-07-29

 * Server responds with a 404 if it does not handle the method.
 * Client returns an error if the server returns a 404.

## 1.0.1 / 2012-04-29

 * Fixes content-length header value when sending multi-byte characters.

## 1.0.0 / 2012-03-28

 * Replaces builder/parser logic with marshaller/unmarshaller.
 * Uses XML-RPC's nil for JavaScript null values and vice versa.
 * Client and parser are now re-entrant safe.
 * Moves test strings to fixture files.
 * Adds 30+ test cases.
 * Special thanks to @agnat for his work on the (un)marshaller and tests.

## 0.9.4 / 2012-03-03

 * Handles chunked method calls.
 * Supports ISO-8859-1 encodings.

## 0.9.3 / 2012-01-21

 * Values with no type now default to String as per XML-RPC spec.

## 0.9.2 / 2011-12-10

 * Replaces the XML parser with the Sax.js module.
 * Uses Travic CI for Continuous Integration.
 * Fixes accidental global variable.

## 0.9.1 / 2011-11-29

 * Returns an Error on invalid XML-RPC.
 * Updates to latest version of xmlbuilder to fix install warning.

## 0.9.0 / 2011-11-01

 * Supports the Base64 datatype.
 * Supports the i8 datatype, treating it as a float.
 * Fixes issue where not returning for faults containing no params.
 * Standardizes how to handle empty params. Last failing test now passes.
 * Enforces null value for error param in callbacks.
 * Updates to latest version of xmlbuilder.

## 0.8.1 / 2011-09-01

 * Supports passing the URI as a string to client or server.
 * Host is now an optional parameter for client or server.
 * Fixes bug when performing a method call multiple times.
 * Removes node_modules directory. Use `npm install .` if cloning.

## 0.8.0 / 2011-08-14

 * Supports HTTPS server and client.
 * Improves Basic Auth support.
 * Errors returned are now an instance of Error, not a String.
 * Fixes bug with structs and whitespace.
 * Fixes bug with empty arrays responses.

## 0.7.1 / 2011-08-02

 * Handles chunked method responses.
 * Fixes parsing multi-line strings values in the String parameter.
 * Allows for custom headers in the HTTP request.

## 0.7.0 / 2011-07-12

 * Renames Client.call() to Client.methodCall().
 * Adds better support for sending and parsing empty String parameters.
 * Client handles errors on http request. Includes handling of invalid URLs.
 * Updates documentation.

## 0.6.2 / 2011-06-15

 * Fixes issue with parsing non-value whitespace in method calls.

## 0.6.1 / 2011-06-03

  * Supports CDATA when generating XML calls or responses.

## 0.6.0 / 2011-05-18

  * Initial release to NPM. Considered stable enough for public use.

