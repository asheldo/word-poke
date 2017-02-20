'use strict'

const server = require("../config/server").serverState.server

const docstore = require("../client/docstore")

// get info
server.get("words/monitor", function(req,res,next) {
  docstore.couchOK()
    .then((result) => {
      res.send(200, result)
      next()
    })
    .catch((err) => {
      res.send(400, err)
      next()
    })
  console.log(`couchOK`)
})
