'use strict'

const config = require('./config/server')
const restify = require('restify')

run()

function run() {
  const ss = config.serverState
  create(ss) // global.server = server
  start(ss)
  console.log(`Server started: ${ss}`)
}

function start(serverState) {
  serverState.server.listen(config.port, function() {
    const routes = require('./api/routes')
    serverState.state = config.serverStates.on
    console.log(`Server listening, port: ${config.port}\n${routes}`)
  })
}

function create(serverState) {
  const server = restify.createServer({
    name: config.name,
    version: config.version
  })
  serverState.server = server
  server.pre(restify.pre.sanitizePath())
  server.use(restify.bodyParser())

  server.on('uncaughtException', (req, res, route, err) => {
    res.send(err)
  })
}
