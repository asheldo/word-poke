'use strict'

const server = require("../config/server").serverState.server

// TODO // const pokeDB = require("../server/pokestore")

const docstore = require("../client/couch")

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
