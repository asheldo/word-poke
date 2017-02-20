'use strict'

const docstore = require("../client/docstore")

// const PouchDB = require('pouchdb')
// var poke = new PouchDB('Poke')

/*
  poke.info().then(onFulfilled : (info) => console.log(info),
    onRejected : (msg) => console.log(msg))
 */

// pokeDB.postSafe(({word: word}))

module.exports.postSafe = function postSafe(data) {
  const word_id = data.word ? data.word.id : null
  const passage_id = data.passage ? data.passage.id : null
  if (word_id && passage_id) {
    postWordPassage(word_id, passage_id)
    return data
  } else if (word_id) {
    postWord(data.word)
    return data
  } else if (passage_id) {
    postPassage(data.passage)
    return data
  } else {
    console.log(`postSafe nothing`)
  }
}

function postWordPassage(word_id, passage_id) {
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

function postPassage(passage) {
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

function postWord(word) {
  console.log(`db: ${word}`)
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
