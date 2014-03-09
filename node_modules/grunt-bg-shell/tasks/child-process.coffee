util = require 'util'
spawn = require('child_process').spawn


exports.execCmd = (command, options, callback)->
  util._extend(
    encoding: "utf8"
    timeout: 0
    maxBuffer: 200 * 1024
    killSignal: "SIGTERM"
    cwd: null
    env: null
  ,
    options
  )

  unless options.maxBuffer > 0 and isFinite options.maxBuffer
    options.maxBuffer = false


  if process.platform is "win32"
    file = "cmd.exe"
    args = ["/s", "/c", "\"" + command + "\""]
    options.windowsVerbatimArguments = true
  else
    file = "/bin/sh"
    args = ["-c", command]


  child = spawn(file, args,
    cwd: options.cwd
    env: options.env
    stdio: [process.stdin]
    windowsVerbatimArguments: !!options.windowsVerbatimArguments
  )


  stdout = null
  stderr = null
  killed = false
  exited = false
  timeoutId = null
  err = null


  exithandler = (code, signal) ->
    return  if exited
    exited = true

    if timeoutId
      clearTimeout timeoutId

    return  unless callback
    if err
      callback err, stdout, stderr
    else if code is 0 and signal is null
      callback null, stdout, stderr
    else
      e = new Error "Command failed: " + (stderr || command)
      e.killed = child.killed or killed
      e.code = code
      e.signal = signal
      callback e, stdout, stderr


  errorhandler = (e) ->
    err = e
    child.stdout.destroy()
    child.stderr.destroy()
    exithandler()


  kill = ->
    child.stdout.destroy()
    child.stderr.destroy()
    killed = true
    try
      child.kill options.killSignal
    catch e
      err = e
      exithandler()


  if options.timeout > 0
    timeoutId = setTimeout kill, options.timeout


  child.stdout.setEncoding options.encoding
  child.stderr.setEncoding options.encoding


  if options.maxBuffer
    stdout = ''
    stderr = ''

    child.stdout.addListener "data", (chunk) ->
      stdout += chunk
      if stdout.length > options.maxBuffer
        err = new Error("stdout maxBuffer exceeded.")
        kill()

    child.stderr.addListener "data", (chunk) ->
      stderr += chunk
      if stderr.length > options.maxBuffer
        err = new Error("stderr maxBuffer exceeded.")
        kill()


  child.addListener "close", exithandler
  child.addListener "error", errorhandler

  child