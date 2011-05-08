# This file is part of mapchat released under Apache License, Version 2.0.
# See the NOTICE for more information.

watch = require 'watch'
step = require 'step'
fs = require 'fs'
path = require 'path'
{exec, spawn} = require 'child_process'

option '-w', '--whitespace', 'whitespace optimization'
option '-n', '--nooptimization', 'turn off optimization'
option '-c', '--cache', 'do not turn off html5 cache'
option '-p', '--profile', 'profile anonymous functions'

task 'build', 'copy couchapp into .build directory and minimize all files', (options) ->
  js = []
  anonymousJs = []
  jsonFiles = []
  htmlFiles = []

  start = +new Date

  step ->
    console.log ' + Preparing directory structure'
    prepareDirs @parallel()
    return
  , (err) ->
    if err
      throw err

    console.log ' + Getting files list'
    watch.walk "#{__dirname}/.build", @parallel()
    return
  , (err, files) ->
    if err
      throw err

    Object.keys(files).forEach (filename) ->
      if /\.js$/.test filename
        if /validate_doc_update|\/(views|shows|lists|filters)\//.test filename
          return
        if /_attachments|vendor/.test filename
          js.push filename
        else if /evently/.test filename
          anonymousJs.push filename
      if /\.json$/.test filename
        jsonFiles.push filename
      if /\.html$/.test filename
        if not /_attachments/.test filename
          if /evently/.test filename
            htmlFiles.push filename

    console.log ' + Running Closure compiler for regular scripts'
    if options.nooptimization
      console.log ' ! Skipped'
      @parallel() null
      return

    if js.length <= 0
      @parallel() null
      return

    promise = minimifyJavascript js, options

    flushMinimified promise, (content) ->
      content
    , @parallel()

    return
  , (err) ->
    if err
      throw err

    console.log ' + Wrapping anonymous functions'
    if options.nooptimization
      console.log ' ! Skipped'
      @parallel() null
      return
    wrapAnonymous anonymousJs, @parallel()
    return
  , (err) ->
    if err
      throw err

    console.log ' + Running Closure compiler for anonymous functions'
    if options.nooptimization
      console.log ' ! Skipped'
      @parallel() null
      return
    promise = minimifyJavascript anonymousJs, options

    flushMinimified promise, (content) ->
      content.replace /^___=/, ''
    , @parallel()

    return
  , (err) ->
    if err
      throw err

    console.log ' + Adding profiling info for anonymous functions'
    unless options.profile
      console.log ' ! Skipped'
      @parallel() null
      return

    profileAnonymous anonymousJs, @parallel()
  , (err) ->
    if err
      throw err

    console.log ' + Minimizing JSON files'
    preprocessFiles jsonFiles, (content) ->
      JSON.stringify JSON.parse content
    , @parallel()
      
    return
  , (err) ->
    if err
      throw err

    console.log ' + Minimizing HTML files'
    preprocessFiles htmlFiles, (content) ->
      content.replace(/\r|\n/mg, '').replace /(\s){2,}/g, '$1'
    , @parallel()

    return
  , (err) ->
    if err
      throw err

    console.log ' + Turn on HTML5 Cache'
    unless options.cache
      console.log ' ! Skipped'
      @parallel() null
      return

    error = null

    try
      indexfile = "#{__dirname}/.build/_attachments/index.html"
      content = fs.readFileSync indexfile
      content = content.toString().replace /<html>/, '<html manifest="cache.manifest">'
      fs.writeFileSync indexfile, content
    catch e
      error = e

    @parallel() error

    return
  , (err) ->
    if err
      throw err
    console.log ' + Done'
    console.log ' ~ [Total time : %d ms]', +new Date - start

prepareDirs = (callback) ->
  exec "rm -rf #{__dirname}/.build && " +
       "mkdir -p #{__dirname}/.build && " +
       "cp -R #{__dirname}/* #{__dirname}/.build/ && " +
       "cp #{__dirname}/.couchappignore #{__dirname}/.build/", callback

wrapAnonymous = (files, callback) ->
  step ->
    group = @group()
    files.forEach (file) ->
      _callback = group()
      fs.readFile file, (err, content) ->
        if err
          return _callback err

        fs.writeFile file, "___=#{content}", _callback
  , callback

profileAnonymous = (files, callback) ->
  step ->
    group = @group()
    files.forEach (file) ->
      _callback = group()
      fs.readFile file, (err, content) ->
        if err
          return _callback err

        pathName = file.replace /^.*\/\.build\//, ''
        pathName = pathName.replace /\.js$/, ''
        pathName = pathName.replace /[^a-z0-9_]/ig, '_'
        pathName = pathName.replace /[aeiuyo]+/ig, ''

        content = content.toString()
        content = content.replace /function\s*\(/,
            "function #{pathName}("
        fs.writeFile file, content, _callback
  , callback

minimifyJavascript = (files, options) ->
  promise = new process.EventEmitter
  args = [
    '-jar'
    "#{__dirname}/compiler.jar",
    '--compilation_level',
    if options.whitespace
      'WHITESPACE_ONLY'
    else
      'SIMPLE_OPTIMIZATIONS'
    ,
    '--warning_level',
    'QUIET',
    '--formatting'
    'PRINT_INPUT_DELIMITER'
  ]
  args = files.reduce (prev, file) ->
    return prev.concat ['--js', file]
  , args
  java = spawn 'java', args
 
  buff = ''
  java.stdout.on 'data', (data) ->
    buff = parse buff + data

  java.stderr.on 'data', (data) ->
    console.log data.toString()

  java.on 'exit', (code) ->
    if code
      promise.emit 'error', new Error "Closure compiler " +
                                      "terminated with: #{code}"
    else
      if buff
        parse buff + '// Input 13589\n'

      promise.emit 'end'

  ignoreFirst = true
  fileIndex = 0
  parse = (buff) ->
    # split by comments: // Input 0
    _buff = buff.split /(?:^|\n)\/\/ Input \d+\n/g
    if _buff.length <= 1
      buff
    else
      while _buff.length > 1
        compressed = _buff.shift()
        if ignoreFirst
          ignoreFirst = false
        else
          promise.emit 'file', {
            name: files[fileIndex++]
            content: compressed
          }
      
      _buff[0]
     
  promise

flushMinimified = (promise, preprocess, callback) ->
  waiting = 1
  errors = []
  once = false
  check = () ->
    waiting--
    if once
      return

    if waiting is 0
      once = true
      if errors.length > 0
        callback errors
      else
        callback null

  promise.on 'end', check
  promise.on 'file', (file) ->
    waiting++
    file.content = preprocess file.content
    fs.writeFile file.name, file.content, (err) ->
      if err
        errors.push err

      check()

preprocessFiles = (files, preprocess, callback) ->
  queue = []
  errors = []
  waiting = files.length
  files.forEach (file) ->
    _callback = (err, data) ->
      if err
        errors.push err

      waiting--

      if waiting == 0
        if errors.length
          callback errors
        else
          callback null
      else
        fn = queue.shift()
        if fn
          fn()

    queue.push () ->
      fs.readFile file, (err, content) ->
        if err
          return _callback err
        try
          content = preprocess content.toString()
        catch e
          return _callback e
        fs.writeFile file, content, _callback

  for i in [0..50]
    fn = queue.shift()
    if fn
      fn()
