'use strict'

// const couchDB = require('couchdb')

const restify = require('restify')

const client = restify.createClient({
  url: 'http://127.0.0.1:5984'
})

module.exports.couchOK = couchOK

function couchOK() {
  // return new pending promise
  return new Promise((resolve, reject) => {
    client.get('/', (err, req) => {
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
