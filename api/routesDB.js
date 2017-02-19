'use strict'

const docstore = require("../client/docstore")

server.get('/word/monitor', function(req, res, next) {
  docstore.couchOK()
    .then((result) => word.doc = result)
    .catch((err) => word.doc = err)
  console.log(`couchOK ${word.doc}`)
})
