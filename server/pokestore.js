'use strict'

const couchDB = require("../client/couch")

// const PouchDB = require('pouchdb')
// var poke = new PouchDB('Poke')

/*
  poke.info().then(onFulfilled : (info) => console.log(info),
    onRejected : (msg) => console.log(msg))
 */

// pokeDB.postSafe(({word: word}))

module.exports.putData = putData

function putData(data) {
  const word_id = data.word ? data.word.id : null
  const passage_id = data.passage ? data.passage.id : null
  if (word_id && passage_id) {
    putWordPassage(word_id, passage_id)
    return data
  } else if (word_id) {
    putWord(data.word)
    return data
  } else if (passage_id) {
    putPassage(data.passage)
    return data
  } else {
    console.log(`postSafe nothing`)
  }
}


function putWord(word) {
  console.log(`db: ${word}`)
  couchDB.couchPut(`/${word.lang}/${word.chars}`, word).then(
    function(ok) {
      // res.send(201, ({ word : word, ok : ok}))
      console.log(ok)
    }
  ).catch(function(err) {
    // res.send(201, ({ word : word, err : err}))
    console.log(err)
  })

}

function putWordPassage(word_id, passage_id) {
  console.log(`db: ${word_id} in ${passage_id}`)
  docstore.couchOK().then(
    function(ok) {
      // res.send(201, ({ word : word, ok : ok}))
      console.log(ok)
    }
  ).catch(function(err) {
    // res.send(201, ({ word : word, err : err}))
    console.log(err)
  })
}

function putPassage(passage) {
  console.log(`db: ${passage}`)
  docstore.couchOK().then(
    function(ok) {
      // res.send(201, ({ word : word, ok : ok}))
      console.log(ok)
    }
  ).catch(function(err) {
    // res.send(201, ({ word : word, err : err}))
    console.log(err)
  })

}
