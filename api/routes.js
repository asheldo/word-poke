'use strict'

const repository = require('./repository')
// const server = global.server
const config = require('../config/server')
const server = config.serverState.server

// Could validate name content, overwritten id, ...
server.post('/word', postWord)
server.post('/passage', postPassage)
server.get('/word/:word_id', getWord)
server.get('/passage/:passage_id', getPassage)
server.post('word/:word_id/passage/:passage_id', postWordPassage)
server.get('/word/:word_id/passage', getWordPassages)

const docstore = require("../client/docstore")

function postWord(req, res, next) {
  try {
    let word = repository.addWord(req.params || {})
    if (word.error) {
      res.send(400, word.error)
    } else {
      docstore.couchOK().then(
        function(ok) {
          res.send(201, ({ word : word, ok : ok}))
        }
      ).catch(function(err) {
        res.send(201, ({ word : word, err : err}))
      })
    }
  } catch (e) {
    res.send(500, e.message)
  }
  return next()
}

function postPassage(req, res, next) {
  try {
    let passage = repository.addPassage(req.params || {})
    if (passage.error) {
      res.send(400, passage.error)
    } else {
      res.send(201, passage)
    }
  } catch (e) {
    res.send(500, e.message)
  }
  return next()
}

function getWord(req, res, next) {
  try {
    let word = repository.findWord(req.params || {})
    if (!word) {
      res.send(404)
    } else if (word.error) {
      res.send(400, word.error)
    } else {
      res.send(200, word)
    }
  } catch (e) {
    res.send(500, e.message)
  }
}

function getPassage(req, res, next) {
  try {
    let passage = repository.findPassage(req.params)
    if (!passage) {
      res.send(404)
    } else if (passage.error) {
      res.send(400, passage.error)
    } else {
      res.send(200, passage)
    }
  } catch (e) {
    res.send(500, e.message)
  }
}

function postWordPassage(req, res, next) {
  try {
    let wordPassage = repository.addWordPassage(req.params)
    if (!wordPassage) {
      res.send(404)
    } else if (wordPassage.error) {
      res.send(400, wordPassage.error)
    } else {
      res.send(201, wordPassage)
    }
  } catch (e) {
    res.send(500, e.message)
  }
  return next()
}

function getWordPassages(req, res, next) {
  try {
    let passages = repository.findWordPassages(req.params)
    if (!passages) {
      res.send(404)
    } else if (passages.error) {
      res.send(400, passages.error)
    } else {
      res.send(200, passages)
    }
  } catch (e) {
    res.send(500, e.message)
  }
}
