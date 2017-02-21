'use strict'

module.exports = { addWord, addPassage, findWord,  findPassage, addWordPassage, findWordPassages }

const memstore = require("./memstore")
const pokeDB = require('./pokestore')

const immutable = (o) => Object.freeze(o)

function addWord(data) {
  if (data.chars == null || data.lang == null || data.english == null) {
    data.error = "A word requires :chars, :lang and :english"
    return data
  }
  const word = {id : null, word : data.chars,
    lang : data.lang, english : data.english}
  memstore.addWord(word)
  pokeDB.putData(({word: word}))
  return immutable(word)
}

function addPassage(data) {
  // Not validating values
  if (data.chars == null || data.source == null || data.lang == null
    || data.english == null) {
    data.error = "A passage requires :chars ,:source, :lang, :english"
    return data
  }
  const passage = {id : null, chars : data.chars,
    source : data.source, lang : data.lang, english : data.english}
  memstore.addPassage(passage)

  return immutable(passage)
}

// immutable person or person-error
function findWord(data) {
  const id = parseInt(data.word_id)
  if (isNaN(id)) {
    data.error = "Word lookup requires valid :word_id"
    return data
  }
  const word = memstore.getWord(id)
  return immutable(word)
}

// immutable passage or passage-error
function findPassage(data) {
  const id = parseInt(data.passage_id)
  if (isNaN(id)) {
    data.error = "Passage lookup requires valid :passage_id"
    return data
  }
  const passage = memstore.getPassage(id)
  return immutable(passage)
}

// immutable pair, or error-data
function addWordPassage(data) {
  const word = findWord(data)
  const passage = findPassage(data)
  if (!word || !passage) {
    return null
  } else if (word.error || passage.error) {
    data.error = "Associating requires existing :word_id and :passage_id"
    return data
  }
  memstore.addWordPassageID(word.id, passage.id)

  return immutable({word_id : word.id,
     passage_id : passage.id})
}

//  array of immutable Passages, or error-data
function findWordPassages(data) {
  const word = findWord(data)
  if (!word) {
    return null
  } else if (word.error) {
    data.error = "Word->Passages lookup requires valid :word_id"
    return data
  }
  // map array of IDs -> Words
  const wordPassageIDs = Array.from(memstore.getWordPassageIDs(word.id))
  const wordPassages = wordPassageIDs.map(x =>
    immutable(memstore.getPassage(x)))
  return wordPassages
}
