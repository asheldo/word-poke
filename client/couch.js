'use strict'

// const couchDB = require('couchdb')

const restify = require('restify')

const client = restify.createJsonClient({
  url: 'http://127.0.0.1:5984',
  version: '*'
})

module.exports.couchPut = couchPut
module.exports.couchGetWord = (lang, word) => couchGet(`/${lang}/${word}`)
module.exports.couchOK = () => couchGet('/')

// promises

function couchPut(path, word) {
    return new Promise((resolve, reject) =>
  client.put(/**/path,/**/ word, (err, req) => {
    req.on('result', (err, res) => {
      // err = status >= 400?
      res.body = ''
      res.setEncoding('utf8')
      res.on('data', (chunk) => res.body += chunk)
      res.on('end', () => resolve(res.body))
    })
    req.on('err', (err) => reject(err))
  }))
}

function couchGet(path) {
  // return new pending promise
  return new Promise((resolve, reject) => {
    client.get(path, (err, req) => {
      // assert.ifError(err) // connection error
      req.on('result', (err, res) => {
        // assert.ifError(err) // HTTP status code >= 400
        res.body = ''
        res.setEncoding('utf8')
        res.on('data', (chunk) => res.body += chunk)
        res.on('end', () => resolve(res.body))
      })
      req.on('error', (err) => reject(err))
    })
  })
}
