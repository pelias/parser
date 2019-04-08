/**
  The http server improves performance on multicore machines by using the
  node core 'cluster' module to fork worker processes.

  The default setting is to use all available CPUs, this will spawn 32 child
  processes on a 32 core machine.

  If you would like to disable this feature (maybe because you are running
  inside a container) then you can do so by setting the env var CPUS=1

  You may also specify exactly how many child processes you would like to
  spawn by setting the env var to a numeric value >1, eg CPUS=4

  If the CPUS env var is set less than 1 or greater than os.cpus().length
  then the default setting will be used (using all available cores).
**/

const os = require('os')
const path = require('path')
const express = require('express')
const cluster = require('cluster')
const AddressParser = require('../parser/AddressParser')

// select the amount of cpus we will use
const envCpus = parseInt(process.env.CPUS, 10)
const cpus = Math.min(Math.max(envCpus || Infinity, 1), os.cpus().length)

// optionally override port/host using env var
var PORT = process.env.PORT || 3000
var HOST = process.env.HOST || undefined
var app = express()

// init placeholder and store it on $app
console.error('parser loading')
app.locals.parser = { address: new AddressParser() }

// generic http headers
app.use((req, res, next) => {
  res.header('Charset', 'utf8')
  res.header('Cache-Control', 'public, max-age=120')
  next()
})

// routes
app.get('/parser/parse', require('./routes/parse'))
app.use('/demo', express.static(path.join(__dirname, '/demo')))

// start multi-threaded server
if (cpus > 1) {
  if (cluster.isMaster) {
    console.error('[master] using %d cpus', cpus)

    // worker exit event
    cluster.on('exit', (worker) => {
      console.error('[master] worker died', worker.process.pid)
    })

    // worker fork event
    cluster.on('fork', (worker) => {
      console.error('[master] worker forked', worker.process.pid)
    })

    // fork workers
    for (var c = 0; c < cpus; c++) {
      cluster.fork()
    }
  } else {
    app.listen(PORT, HOST, () => {
      console.error('[worker %d] listening on %s:%s', process.pid, HOST || '0.0.0.0', PORT)
    })
  }

  // start single-threaded server
} else {
  console.error('[master] using %d cpus', cpus)

  app.listen(PORT, HOST, () => {
    console.log('[master] listening on %s:%s', HOST || '0.0.0.0', PORT)
  })
}
